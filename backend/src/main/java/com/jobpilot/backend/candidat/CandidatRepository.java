package com.jobpilot.backend.candidat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidatRepository extends JpaRepository<Candidat, Long> {

    boolean existsByEmailIgnoreCase(String email);
}