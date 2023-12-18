package com.fastfour.pathfinderbackend.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class LoginFormDTO {

    @NotNull(message = "Username is required.")
    @NotBlank
    @Size(min = 1, message = "Username is invalid.")
    private String username;


    @NotNull(message = "Password is required.")
    @NotBlank
    @Size(min = 6, message = "Password should be at least 6 characters.")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
