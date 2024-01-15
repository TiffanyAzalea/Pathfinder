package com.fastfour.pathfinderbackend.repository;

import com.fastfour.pathfinderbackend.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments, Long> {
    List<Comments> findAllCommentsByTrailName(String trailName);
}
