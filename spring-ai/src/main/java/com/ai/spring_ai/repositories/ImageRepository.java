package com.ai.spring_ai.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ai.spring_ai.model.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {

    List<Image> findByUserId(UUID userId); 
    Page<Image> findByUserId(UUID userId, Pageable pageable);
    Page<Image> findByUserIdAndPromptContainingIgnoreCase(
        UUID userId,
        String prompt,
        Pageable pageable
);
}