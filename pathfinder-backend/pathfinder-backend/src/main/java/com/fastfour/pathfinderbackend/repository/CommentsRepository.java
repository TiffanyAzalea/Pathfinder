package com.fastfour.pathfinderbackend.repository;

import com.fastfour.pathfinderbackend.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepository  extends JpaRepository<Comments, Long> {
}