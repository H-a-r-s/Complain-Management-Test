package com.harsh.complaint_service.exception;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String msg){ super(msg); }
}