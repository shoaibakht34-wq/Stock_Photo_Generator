package com.ai.spring_ai.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ImageService {

    @Value("${huggingface.api.url}")
    private String apiUrl;

    @Value("${huggingface.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public byte[] generateImage(String prompt) {
    try {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.IMAGE_PNG));

        String body = """
        {
          "inputs": "%s",
          "parameters": {
            "width": 1024,
            "height": 1024
          }
        }
        """.formatted(prompt);

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<byte[]> response = restTemplate.exchange(
                apiUrl,   // ✅ direct use (no replace)
                HttpMethod.POST,
                request,
                byte[].class
        );

        return response.getBody();

    } catch (Exception e) {
        e.printStackTrace();
        return "ERROR: Image generation failed".getBytes();
    }
}
}