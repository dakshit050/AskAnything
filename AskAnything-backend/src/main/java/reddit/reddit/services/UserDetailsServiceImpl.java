package reddit.reddit.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import reddit.reddit.model.User;
import reddit.reddit.repositories.UserRepository;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String s){
        Optional<reddit.reddit.model.User> useroptional= userRepository.findByUsername(s);
        User user = useroptional.orElseThrow(()-> new UsernameNotFoundException("No User Found with username"+s));
        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),
                user.isEnabled(),true,true,true,getAuthorities("USER"));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(String role){
        return Collections.singletonList(new SimpleGrantedAuthority(role));
    }
}
