package com.fastfour.pathfinderbackend.controller;

import com.fastfour.pathfinderbackend.model.Comment;
import com.fastfour.pathfinderbackend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin
    @RequestMapping("/api/comments")
    public class CommentController {

        @Autowired
        private CommentRepository commentRepository;

        @GetMapping
        public List<Comment> getAllComments() {
            return commentRepository.findAll();
        }

        @PostMapping
        public Comment addComment(@RequestBody Comment comment) {
            comment.setDate(LocalDateTime.now());
            return commentRepository.save(comment);
        }
    }