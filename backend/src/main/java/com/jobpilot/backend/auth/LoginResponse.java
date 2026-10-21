package com.jobpilot.backend.auth;

public record LoginResponse(
        String token,
        String role,
        String nom,
        String prenom
) {}