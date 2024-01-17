package com.fastfour.pathfinderbackend.controller;

import com.fastfour.pathfinderbackend.model.Comments;
import com.fastfour.pathfinderbackend.repository.CommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:3000")
@RestController
public class CommentsController {
    @Autowired
    private CommentsRepository commentsRepository;
    @PostMapping("/comments")
    Comments newComment(@RequestBody Comments newComment){
        return commentsRepository.save(newComment);
    }

   /* @GetMapping("/comments/{trailName}")
    List<Comments> getAllCommentsByTrailName(@PathVariable String trailName ){
        return commentsRepository.findAllCommentsByTrailName(trailName);
    }*/
}
