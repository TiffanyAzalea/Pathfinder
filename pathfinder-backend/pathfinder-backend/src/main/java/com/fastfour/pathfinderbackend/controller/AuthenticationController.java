package com.fastfour.pathfinderbackend.controller;


import com.fastfour.pathfinderbackend.model.User;
import com.fastfour.pathfinderbackend.model.dto.LoginFormDTO;
import com.fastfour.pathfinderbackend.model.dto.LoginResponseDTO;
import com.fastfour.pathfinderbackend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import java.util.Optional;


@RestController
@RequestMapping("/login")
@CrossOrigin("http://localhost:3000")
public class AuthenticationController {

    @Autowired
    UserRepository userRepository;

    private static final String userSessionKey = "user";

    public User getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }

        Optional<User> user = userRepository.findById(Long.valueOf(userId));

        return user.orElse(null);

    }

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    //Registration form info

    //Login form



    @PostMapping
    public ResponseEntity<LoginResponseDTO> performLogin(@Valid @RequestBody LoginFormDTO loginFormDTO
                                                         ,HttpServletRequest request) {
       // setUserInSession(request.getSession(), theUser);

        return ResponseEntity.ok(new LoginResponseDTO("Success !"));

        }

        //User theUser = userRepository.findByUsername(loginFormDTO.getUsername());



         //possibly move code up

        //redirect to home page?

    @GetMapping("/logout")
    public String logout(HttpServletRequest request){
        request.getSession().invalidate();
        return "redirect:/login";
    }

}
