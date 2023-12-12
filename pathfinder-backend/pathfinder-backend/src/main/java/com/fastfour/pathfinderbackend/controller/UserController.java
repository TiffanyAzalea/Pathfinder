package com.fastfour.pathfinderbackend.controller;

import com.fastfour.pathfinderbackend.exception.UserNotFoundException;
import com.fastfour.pathfinderbackend.model.User;
import com.fastfour.pathfinderbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3306")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) { return userRepository.save(newUser);}

    @GetMapping("/user")
    List<User> getAllUsers() { return userRepository.findAll(); }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }

}
