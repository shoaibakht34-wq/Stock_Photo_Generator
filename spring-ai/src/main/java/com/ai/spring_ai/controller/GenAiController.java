package com.ai.spring_ai.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ai.spring_ai.dto.ApiResponse;
import com.ai.spring_ai.dto.ImageRequest;
import com.ai.spring_ai.dto.ImageResponse;
import com.ai.spring_ai.model.Image;
import com.ai.spring_ai.repositories.ImageRepository;
import com.ai.spring_ai.services.ChatService;
import com.ai.spring_ai.services.ImageService;
import com.ai.spring_ai.services.SupabaseService;

import org.springframework.web.bind.annotation.RequestBody;
//import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
public class GenAiController {
   private final  ChatService chatService;
   private final  ImageService imageService;
   private final SupabaseService supabaseService;
   private final ImageRepository imageRepository;

public GenAiController(
    ImageService imageService,
    ChatService chatService,
    SupabaseService supabaseService,
    ImageRepository imageRepository
) {
    this.imageService = imageService;
    this.chatService = chatService;
    this.supabaseService = supabaseService;
    this.imageRepository = imageRepository;
}

   @GetMapping("/ask-ai")
public ResponseEntity<ApiResponse<?>> getResponse(@RequestParam String prompt){

    String reply = chatService.getResponse(prompt);

    return ResponseEntity.ok(
        new ApiResponse<>(true, "AI response", reply)
    );
}
    @GetMapping("ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt){
        return chatService.getResponseOptions(prompt);
    }
 

@PostMapping("/generate-image") public ResponseEntity<ApiResponse<?>> generateImage(@RequestBody ImageRequest request) { 
    String prompt = request.getPrompt(); 
    UUID userId = (UUID) SecurityContextHolder
    .getContext() .
    getAuthentication().getPrincipal(); 
    byte[] image = imageService.generateImage(request.getPrompt()); 
    String imageUrl = supabaseService.uploadImage(image); 
    Image img = new Image(); 
    img.setPrompt(request.getPrompt());
     img.setImageUrl(imageUrl); 
     img.setUserId(userId); 
     imageRepository.save(img); 
     return ResponseEntity.ok( 
        new ApiResponse<>(true, "Image generated successfully", new ImageResponse(imageUrl, request.getPrompt())
    )
);
}
@GetMapping("/my-images")
public ResponseEntity<ApiResponse<?>> getMyImages(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size
) {

    UUID userId = (UUID) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

    Pageable pageable = PageRequest.of(page, size);

    Page<Image> imagesPage = imageRepository.findByUserId(userId, pageable);

    return ResponseEntity.ok(
            new ApiResponse<>(true, "User images fetched", imagesPage)
    );
}
@DeleteMapping("/delete-image/{id}")
public ResponseEntity<ApiResponse<?>> deleteImage(@PathVariable UUID id) {

    

    UUID userId = (UUID) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

    Image img = imageRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Image not found"));

    if (!img.getUserId().equals(userId)) {
        throw new RuntimeException("Unauthorized");
    }

    imageRepository.delete(img);

    return ResponseEntity.ok(
            new ApiResponse<>(true, "Image deleted", null)
    );
}
@PutMapping("/like-image/{id}")
public ResponseEntity<ApiResponse<?>> likeImage(@PathVariable UUID id) {

    Image img = imageRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Image not found"));

    img.setLiked(!img.isLiked()); // toggle

    imageRepository.save(img);

    return ResponseEntity.ok(
            new ApiResponse<>(true, "Updated", img)
    );
}
@GetMapping("/search-images")
public ResponseEntity<ApiResponse<?>> searchImages(
        @RequestParam String keyword,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size
) {
    UUID userId = (UUID) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

    Pageable pageable = PageRequest.of(page, size);

    Page<Image> images = imageRepository
            .findByUserIdAndPromptContainingIgnoreCase(userId, keyword, pageable);

    return ResponseEntity.ok(
            new ApiResponse<>(true, "Search results", images)
    );
}
@GetMapping("/dashboard")
public ResponseEntity<ApiResponse<?>> getDashboard() {

    UUID userId = (UUID) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

    List<Image> images = imageRepository.findByUserId(userId);

    long total = images.size();
    long liked = images.stream().filter(Image::isLiked).count();

    return ResponseEntity.ok(
        new ApiResponse<>(true, "Dashboard data",
            Map.of(
                "totalImages", total,
                "likedImages", liked
            )
        )
    );
}
}