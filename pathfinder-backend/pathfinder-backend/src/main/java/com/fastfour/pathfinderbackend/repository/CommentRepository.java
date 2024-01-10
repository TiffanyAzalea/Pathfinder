package com.fastfour.pathfinderbackend.repository;

import com.fastfour.pathfinderbackend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository  extends JpaRepository<Comment, Long> {
}
