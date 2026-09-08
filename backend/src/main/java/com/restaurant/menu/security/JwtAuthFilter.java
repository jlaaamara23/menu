package com.restaurant.menu.security;

import com.restaurant.menu.entity.Admin;
import com.restaurant.menu.repository.AdminRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final AdminRepository adminRepository;

    public JwtAuthFilter(JwtService jwtService, AdminRepository adminRepository) {
        this.jwtService = jwtService;
        this.adminRepository = adminRepository;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        try {
            String email = jwtService.extractEmail(token);
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                Admin admin = adminRepository.findByEmail(email).orElse(null);
                if (admin != null && jwtService.isTokenValid(token, admin.getEmail())) {
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    admin.getEmail(),
                                    null,
                                    List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
                            );
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception ignored) {
            // Invalid token — continue without authentication
        }

        filterChain.doFilter(request, response);
    }
}
