package com.fastfour.pathfinderbackend.controller;

import com.fastfour.pathfinderbackend.exception.UserNotFoundException;
import com.fastfour.pathfinderbackend.model.User;
import com.fastfour.pathfinderbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) { return userRepository.save(newUser);}

    @PutMapping("/user/{id}")
    public ResponseEntity<?> editUser(@RequestBody User userDetails, @PathVariable Long id) {
        User updateUser = userRepository.findById(id).get();
            updateUser.setFirstName(userDetails.getFirstName());
            updateUser.setLastName(userDetails.getLastName());
            updateUser.setEmail(userDetails.getEmail());
            updateUser.setPassword(userDetails.getPassword());
            userRepository.save(updateUser);
                return ResponseEntity.ok(updateUser);
    }

    @GetMapping("/user")
    List<User> getAllUsers() { return userRepository.findAll(); }

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        User passUser = userRepository.findByUsername(username);
        return new ResponseEntity<>(passUser, HttpStatus.OK);
    }

}
