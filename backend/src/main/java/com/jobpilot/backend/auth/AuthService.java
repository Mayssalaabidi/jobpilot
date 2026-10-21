package com.jobpilot.backend.auth;

import com.jobpilot.backend.candidat.Candidat;
import com.jobpilot.backend.candidat.CandidatRepository;
import com.jobpilot.backend.exception.EmailAlreadyUsedException;
import com.jobpilot.backend.exception.InvalidCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final CandidatRepository candidats;
    private final PasswordEncoder encoder;
    private final TokenService tokens;

    public AuthService(CandidatRepository candidats, PasswordEncoder encoder, TokenService tokens) {
        this.candidats = candidats;
        this.encoder = encoder;
        this.tokens = tokens;
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
        Candidat candidat = candidats.findByEmailIgnoreCase(req.email().trim())
                .orElseThrow(InvalidCredentialsException::new);

        if (!encoder.matches(req.motDePasse(), candidat.getMotDePasse())) {
            throw new InvalidCredentialsException();
        }

        return new LoginResponse(tokens.generate(candidat), CandidatResponse.from(candidat));
    }
}