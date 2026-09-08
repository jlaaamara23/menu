package com.restaurant.menu.service;

import com.restaurant.menu.dto.AdminResponse;
import com.restaurant.menu.dto.LoginRequest;
import com.restaurant.menu.dto.LoginResponse;
import com.restaurant.menu.entity.Admin;
import com.restaurant.menu.exception.ResourceNotFoundException;
import com.restaurant.menu.repository.AdminRepository;
import com.restaurant.menu.security.JwtService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(AdminRepository adminRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        Admin admin = adminRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPasswordHash())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        String token = jwtService.generateToken(admin.getEmail());
        return LoginResponse.builder()
                .token(token)
                .name(admin.getName())
                .email(admin.getEmail())
                .build();
    }

    public AdminResponse me(String email) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
        return AdminResponse.builder()
                .id(admin.getId())
                .name(admin.getName())
                .email(admin.getEmail())
                .build();
    }
}
