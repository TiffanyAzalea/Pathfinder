package com.fastfour.pathfinderbackend.model;

import com.fastfour.pathfinderbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {


    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userByEmail = Optional.ofNullable(userRepository.findByUsername(username));
        return (UserDetails) userByEmail.orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }
}