package com.fastfour.pathfinderbackend.exception;

public class HikeNotFoundException extends RuntimeException{
    public HikeNotFoundException(Long id){
        super("We could not find the requested hike");
    }
}
