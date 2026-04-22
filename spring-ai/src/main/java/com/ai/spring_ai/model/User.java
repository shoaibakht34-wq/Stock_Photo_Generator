package com.ai.spring_ai.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
@Entity
@Table(name = "app_users") 
public class User {
    @Id
    @GeneratedValue
    private UUID id;
    @NotBlank(message = "Username is required")
    private String username;
    @NotBlank(message = "Password is required")
    private String password;
    @Email(message = "Invalid email")
    private String email;
    

    public User() {}

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email=email;
    }

    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public String getEmail() { return email; }

    public void setUsername(String username) { this.username = username; }
    public void setPassword(String password) { this.password = password; }
    public void setEmail(String email) { this.email = email; }

    public UUID getId() {
        return id;
}
public void setId(UUID id) {
    this.id = id;
}


}