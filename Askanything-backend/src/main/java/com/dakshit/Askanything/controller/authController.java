package com.dakshit.Askanything.controller;
import com.dakshit.Askanything.dto.AuthenticationResponse;
import com.dakshit.Askanything.dto.Loginrequest;
import com.dakshit.Askanything.dto.RegisterRequest;
import com.dakshit.Askanything.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class authController {
    @Autowired
    private AuthService authService;
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody RegisterRequest registerRequest){
        authService.signup(registerRequest);
        return ResponseEntity.status(HttpStatus.OK).body("User Registration successful");
    }

    @GetMapping("/accountVerificatition/{token}")
    public ResponseEntity<String> verifyAccount(@PathVariable String token){
        authService.verifyAccount(token);
        return new ResponseEntity<>("Account Activated Successfully",HttpStatus.OK);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody Loginrequest loginRequest) throws Exception {
        return authService.login(loginRequest);
    }
}
