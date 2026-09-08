package com.restaurant.menu.controller;

import com.restaurant.menu.dto.AdminResponse;
import com.restaurant.menu.dto.LoginRequest;
import com.restaurant.menu.dto.LoginResponse;
import com.restaurant.menu.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public AdminResponse me(Authentication authentication) {
        return authService.me(authentication.getName());
    }
}
