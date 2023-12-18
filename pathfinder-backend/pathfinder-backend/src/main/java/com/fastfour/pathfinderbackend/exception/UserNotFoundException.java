package com.fastfour.pathfinderbackend.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id){
        super("We could not find the requested user id " + id);
    }
}
