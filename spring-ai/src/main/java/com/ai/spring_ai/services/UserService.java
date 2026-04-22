package com.ai.spring_ai.services;

import com.ai.spring_ai.dto.ApiResponse;
import com.ai.spring_ai.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ai.spring_ai.repositories.UserRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    private final Map<String, User> users = new HashMap<>();
   public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
    this.passwordEncoder = passwordEncoder;
    this.userRepository = userRepository;
}
public ApiResponse<Void> register(User user) {

    if (user.getUsername() == null || user.getPassword() == null) {
        throw new RuntimeException("Invalid input");
    }

    if (userRepository.findByUsername(user.getUsername()).isPresent()) {
        throw new RuntimeException("Username already exists");
    }

    user.setId(UUID.randomUUID());

    user.setPassword(passwordEncoder.encode(user.getPassword()));

    userRepository.save(user);

    return new ApiResponse<>(true, "User registered successfully", null);
}

public User login(String username, String password) {
    User user = userRepository.findByUsername(username).orElse(null);

    if (user != null && passwordEncoder.matches(password, user.getPassword())) {
        return user;
    }
    return null;
}
}
  