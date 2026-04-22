package com.ai.spring_ai.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
public class SupabaseService {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.key}")
    private String supabaseKey;

    @Value("${supabase.bucket}")
    private String bucket;

    private final RestTemplate restTemplate = new RestTemplate();

    public String uploadImage(byte[] imageBytes) {

        String fileName = UUID.randomUUID() + ".png";

        String uploadUrl = supabaseUrl + "/storage/v1/object/" + bucket + "/" + fileName;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(supabaseKey);
        headers.setContentType(MediaType.IMAGE_PNG);

        HttpEntity<byte[]> request = new HttpEntity<>(imageBytes, headers);

        restTemplate.exchange(uploadUrl, HttpMethod.PUT, request, String.class);

        // ✅ Public URL
        return supabaseUrl + "/storage/v1/object/public/" + bucket + "/" + fileName;
    }
}
