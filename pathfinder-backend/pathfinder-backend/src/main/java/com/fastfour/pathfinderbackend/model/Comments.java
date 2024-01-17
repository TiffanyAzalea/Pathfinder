package com.fastfour.pathfinderbackend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Comments {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    Long userId;
    @OneToOne
    @PrimaryKeyJoinColumn(name = "user_id")
    User user;

    private Long commentId;

    private String author;
    private String text;
    private LocalDateTime date;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long id) {
        this.commentId = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}