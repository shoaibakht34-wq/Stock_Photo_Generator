package com.ai.spring_ai.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue
    private UUID id;

    private UUID userId;

    private String prompt;

    private String imageUrl;

    private LocalDateTime createdAt;
    private boolean liked = false;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isLiked() {
        return liked;
        
    }

    public void setLiked(boolean b) {
        this.liked = b;
    }

    
    
}
