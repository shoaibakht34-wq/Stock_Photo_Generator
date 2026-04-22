package com.ai.spring_ai.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;

public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getServletPath().startsWith("/auth");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                   HttpServletResponse response,
                                   FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if (request.getRequestURI().contains("/auth")) {
    filterChain.doFilter(request, response);
    return;
}

        // ✅ ONLY process if header exists
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            try {
                String token = authHeader.substring(7);
                UUID userId = jwtUtil.extractUserId(token);

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userId, null, new ArrayList<>());

                SecurityContextHolder.getContext().setAuthentication(auth);

            } catch (Exception e) {
                // ❗ DO NOT block request
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }
}