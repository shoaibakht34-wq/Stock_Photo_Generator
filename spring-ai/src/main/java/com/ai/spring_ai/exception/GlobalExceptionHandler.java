package com.ai.spring_ai.exception;

import com.ai.spring_ai.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<?>> handleRuntimeException(RuntimeException ex) {
        return new ResponseEntity<>(
                new ApiResponse<>(false, ex.getMessage(), null),
                HttpStatus.BAD_REQUEST
        );
    }
    @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> handleValidationException(Exception ex) {
        return new ResponseEntity<>(
                new ApiResponse<>(false, "Validation failed", null),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleException(Exception ex) {
        return new ResponseEntity<>(
                new ApiResponse<>(false, "Something went wrong", null),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}