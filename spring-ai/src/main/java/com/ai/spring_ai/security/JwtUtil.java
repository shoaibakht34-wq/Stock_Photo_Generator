package com.ai.spring_ai.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Component;
@Component
public class JwtUtil {

    private static final String SECRET = "mysecretkeymysecretkeymysecretkey";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(UUID userId) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(key)
                .compact();
    }

    public UUID extractUserId(String token) {
        String userId = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

        return UUID.fromString(userId);
    }
}