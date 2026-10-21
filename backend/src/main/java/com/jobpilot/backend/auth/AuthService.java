package com.jobpilot.backend.auth;

import com.jobpilot.backend.candidat.Candidat;
import com.jobpilot.backend.candidat.CandidatRepository;
import com.jobpilot.backend.exception.EmailAlreadyUsedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final CandidatRepository candidats;
    private final PasswordEncoder encoder;

    public AuthService(CandidatRepository candidats, PasswordEncoder encoder) {
        this.candidats = candidats;
        this.encoder = encoder;
    }

    public CandidatResponse registerCandidat(RegisterCandidatRequest req) {
        String email = req.email().trim().toLowerCase();

        if (candidats.existsByEmailIgnoreCase(email)) {
            throw new EmailAlreadyUsedException(email);
        }

        Candidat candidat = new Candidat(
                req.nom().trim(),
                req.prenom().trim(),
                email,
                encoder.encode(req.motDePasse()),
                req.numero(),
                req.niveau());

        return CandidatResponse.from(candidats.save(candidat));
    }
    public LoginResponse login(LoginRequest req) {
        Candidat c = candidatRepository.findByEmailIgnoreCase(req.email())
                .orElseThrow(() -> new BadCredentialsException("Email ou mot de passe incorrect"));

        if (!passwordEncoder.matches(req.password(), c.getPassword())) {
            throw new BadCredentialsException("Email ou mot de passe incorrect");
        }

        String token = jwtService.generateToken(c.getEmail(), "CANDIDAT");
        return new LoginResponse(token, "CANDIDAT", c.getNom(), c.getPrenom());
    }
}