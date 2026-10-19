package com.jobpilot.backend.auth;

import jakarta.validation.constraints.*;

public record RegisterCandidatRequest(
        @NotBlank(message = "Le nom est obligatoire") String nom,
        @NotBlank(message = "Le prénom est obligatoire") String prenom,
        @NotBlank(message = "L'email est obligatoire")
        @Email(message = "Email invalide") String email,
        @NotBlank(message = "Le mot de passe est obligatoire")
        @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères") String motDePasse,
        @Pattern(regexp = "^$|^[0-9+ ]{8,15}$", message = "Numéro de téléphone invalide") String numero,
        String niveau
) {}