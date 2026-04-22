package com.ai.spring_ai.config;

import io.github.bucket4j.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    // Create rate limit bucket (5 requests per minute per IP)
    private Bucket createBucket() {
        return Bucket.builder()
                .addLimit(Bandwidth.classic(5,
                        Refill.intervally(5, Duration.ofMinutes(1))))
                .build();
    }

    private Bucket resolveBucket(String ip) {
        return buckets.computeIfAbsent(ip, k -> createBucket());
    }

    // 🔥 MOST IMPORTANT: Skip /auth completely
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/auth");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                   HttpServletResponse response,
                                   FilterChain filterChain)
            throws ServletException, IOException {

        String ip = request.getRemoteAddr();
        Bucket bucket = resolveBucket(ip);

        // Allow request if token available
        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(429);
            response.getWriter().write("Too many requests");
        }
    }
}