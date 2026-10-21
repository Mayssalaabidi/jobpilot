package com.jobpilot.backend.auth;

public record LoginResponse(String token, CandidatResponse candidat) {}