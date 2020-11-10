package com.dakshit.Askanything.services;

import com.dakshit.Askanything.dto.AuthenticationResponse;
import com.dakshit.Askanything.dto.Loginrequest;
import com.dakshit.Askanything.dto.RegisterRequest;
import com.dakshit.Askanything.exceptions.SpringRedditException;
import com.dakshit.Askanything.model.NotificationEmail;
import com.dakshit.Askanything.model.User;
import com.dakshit.Askanything.model.VerificationToken;
import com.dakshit.Askanything.repositories.UserRepository;
import com.dakshit.Askanything.repositories.VerificationTokenRepository;
import com.dakshit.Askanything.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VerificationTokenRepository verificationTokenRepository;
    @Autowired
    private MailService mailService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private JwtUtil jwttoken;

    @Transactional
    public  void signup(RegisterRequest registerRequest){
        boolean checkUserEmail=userRepository.findByEmail(registerRequest.getEmail()).isPresent();
        if (checkUserEmail){
            throw new SpringRedditException("Email Allready exists");
        }
        boolean checkUserName=userRepository.findByUsername(registerRequest.getUsername()).isPresent();
        if (checkUserName){
            throw new SpringRedditException("Username Allready exists");
        }
        User user= new User();
        user.setEmail(registerRequest.getEmail());
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEnabled(false);
        user.setCreated(Instant.now());
        userRepository.save(user);
        String token= generateVerificationToken(user);
        mailService.sendMail(new NotificationEmail(
                "please activate your Account",
                user.getEmail(),
                "Activate by clicking this link:"+"http://127.0.0.1:8080/api/auth/accountVerificatition/"+token));
    }

    private String generateVerificationToken(User user){
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken= new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationTokenRepository.save(verificationToken);
        return token;
    }

    public void verifyAccount(String token) {
        Optional<VerificationToken> verificationToken=verificationTokenRepository.findByToken(token);
        verificationToken.orElseThrow(()->new SpringRedditException("Invalid token"));
        featchUserAndEnable(verificationToken.get());
    }

    @Transactional
    private void featchUserAndEnable(VerificationToken verificationToken){
        String username=verificationToken.getUser().getUsername();
        User user= userRepository.findByUsername(username).orElseThrow(()->new SpringRedditException("Username Not Found"));
        user.setEnabled(true);
        userRepository.save(user);

    }

    public AuthenticationResponse login(Loginrequest loginRequest) throws Exception {
        try {
            Authentication authentication=authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }catch (Exception e){
            throw new Exception("Incorrect Username or Password",e);
        }
        final UserDetails userDetails= userDetailsService.loadUserByUsername(loginRequest.getUsername());

        final String jwt=jwttoken.generateToken(userDetails);
        String username=getCurrentUser().getUsername();
        return new AuthenticationResponse(jwt,username);
    }

    @Transactional
    public User getCurrentUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(principal.getUsername())
                .orElseThrow(()-> new UsernameNotFoundException("User Not Found with Name"+principal.getUsername()));
    }
}
