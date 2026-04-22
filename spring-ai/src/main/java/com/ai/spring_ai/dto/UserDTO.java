package com.ai.spring_ai.dto;

import java.util.UUID;

public class UserDTO {

    private UUID id;
    private String username;
    private String email;

    public UserDTO(UUID id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    public UUID getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}