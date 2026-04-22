package com.ai.spring_ai.dto;

public class ImageResponse {
    private String imageUrl;
    private String prompt;

    public ImageResponse(String imageUrl, String prompt) {
        this.imageUrl = imageUrl;
        this.prompt = prompt;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getPrompt() {
        return prompt;
    }
}
