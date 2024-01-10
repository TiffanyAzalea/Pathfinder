package com.fastfour.pathfinderbackend.controller;

import com.fastfour.pathfinderbackend.model.Comments;
import com.fastfour.pathfinderbackend.repository.CommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class CommentsController {
    @Autowired
    private CommentsRepository commentsRepository;
    @PostMapping("/comments")
    Comments newComment(@RequestBody Comments newComment){
        return commentsRepository.save(newComment);
    }

    @GetMapping("/allcomments")
    List<Comments> getAllComments(){
        return commentsRepository.findAll();
    }

}
