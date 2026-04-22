package com.ai.spring_ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.ai.spring_ai.repositories")
public class SpringAiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringAiApplication.class, args);
	}
 
}
