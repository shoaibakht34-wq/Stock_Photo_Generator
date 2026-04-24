package com.ai.spring_ai.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
<<<<<<< HEAD
                        .allowedOrigins("https://your-netlify-app.netlify.app")
=======
                        .allowedOrigins("https://ai-image-generataion.netlify.app/")
>>>>>>> 67400e12b9594b52d798d7d1624aa77b5dd83570
                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }
}
