package com.jobpilot.backend.candidat;

import com.jobpilot.backend.auth.CandidatResponse;
import com.jobpilot.backend.exception.InvalidCredentialsException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/me")
public class MeController {

    private final CandidatRepository candidats;

    public MeController(CandidatRepository candidats) {
        this.candidats = candidats;
    }

    @GetMapping
    public CandidatResponse me(@AuthenticationPrincipal Jwt jwt) {
        return candidats.findByEmailIgnoreCase(jwt.getSubject())
                .map(CandidatResponse::from)
                .orElseThrow(InvalidCredentialsException::new);
    }
}