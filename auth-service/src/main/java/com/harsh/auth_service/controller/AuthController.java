package com.harsh.auth_service.controller;

import com.harsh.auth_service.dto.LoginRequest;
import com.harsh.auth_service.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;

    private static final String ADMIN_USER = "admin";
    private static final String ADMIN_PASS = "admin123";

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req){
        if(req == null || req.getUsername() == null || req.getPassword() == null){
            return ResponseEntity.badRequest().body(Map.of("message","Credentials required."));
        }

        if (!ADMIN_USER.equals(req.getUsername()) || !ADMIN_PASS.equals(req.getPassword())){
            return ResponseEntity.status(401).body(Map.of("message","Invalid credentials"));
        }

        String token = jwtService.generateToken(req.getUsername());

        return ResponseEntity.ok(Map.of("token", token, "tokentype","Bearer"));
    }
}
