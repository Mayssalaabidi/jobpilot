package com.jobpilot.backend.candidat;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "candidats")
public class Candidat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String motDePasse;

    private String numero;
    private String niveau;
    private String cv;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dateInscription = LocalDateTime.now();

    protected Candidat() {}

    public Candidat(String nom, String prenom, String email, String motDePasse, String numero, String niveau) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.numero = numero;
        this.niveau = niveau;
    }

    public Long getId() { return id; }
    public String getNom() { return nom; }
    public String getPrenom() { return prenom; }
    public String getEmail() { return email; }
    public String getMotDePasse() { return motDePasse; }
    public String getNumero() { return numero; }
    public String getNiveau() { return niveau; }
    public String getCv() { return cv; }
    public void setCv(String cv) { this.cv = cv; }
    public LocalDateTime getDateInscription() { return dateInscription; }
}