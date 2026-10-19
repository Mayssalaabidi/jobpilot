package com.jobpilot.backend.auth;

import com.jobpilot.backend.candidat.Candidat;

public record CandidatResponse(Long id, String nom, String prenom, String email, String numero, String niveau) {

    public static CandidatResponse from(Candidat c) {
        return new CandidatResponse(c.getId(), c.getNom(), c.getPrenom(), c.getEmail(), c.getNumero(), c.getNiveau());
    }
}