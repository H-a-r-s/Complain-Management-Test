package com.harsh.complaint_service.dto;
import java.time.Instant;

public class ApiResponse<T> {
    public boolean success;
    public String message;
    public T data;
    public Instant timestamp = Instant.now();

    public static <T> ApiResponse<T> ok(String message, T data) {
        ApiResponse<T> r = new ApiResponse<>();
        r.success = true; r.message = message; r.data = data;
        return r;
    }

    public static <T> ApiResponse<T> fail(String message, T data) {
        ApiResponse<T> r = new ApiResponse<>();
        r.success = false; r.message = message; r.data = data;
        return r;
    }
}