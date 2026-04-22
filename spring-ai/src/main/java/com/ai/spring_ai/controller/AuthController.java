package com.ai.spring_ai.controller;

import com.ai.spring_ai.dto.ApiResponse;
import com.ai.spring_ai.dto.UserDTO;
import com.ai.spring_ai.model.User;
import com.ai.spring_ai.security.JwtUtil;
import com.ai.spring_ai.services.UserService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil=jwtUtil;
    }

    
    @PostMapping("/register")
    public ApiResponse<Void> register(@Valid @RequestBody User user) {
        return userService.register(user);
    }

    
  @PostMapping("/login")
public ResponseEntity<ApiResponse<?>> login(@Valid @RequestBody User user) {

    User validUser = userService.login(user.getUsername(), user.getPassword());
    String token=jwtUtil.generateToken(validUser.getId());

    if (validUser == null) {
        throw new RuntimeException("Invalid credentials");
    }

    UserDTO userDTO = new UserDTO(
            validUser.getId(),
            validUser.getUsername(),
            validUser.getEmail()
    );

    return ResponseEntity.ok(
            new ApiResponse<>(true, "Login successful",  token)
    );
}
}


