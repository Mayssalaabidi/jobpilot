import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register-candidat',
  imports: [ReactiveFormsModule],
  template: `
    <div class="page">
      <div class="brand">
        <h1>JobPilot</h1>
        <p>Ton avenir, notre mission</p>
      </div>

      <form [formGroup]="form" (ngSubmit)="submit()" class="card" novalidate>
        <h2>Créer mon compte candidat</h2>
        <p class="subtitle">Rejoins la plateforme et laisse l'IA trouver les offres faites pour toi.</p>

        <div class="row">
          <div class="field">
            <label for="nom">Nom</label>
            <input id="nom" formControlName="nom" [class.invalid]="invalid('nom')" />
            @if (invalid('nom')) { <small>Le nom est obligatoire</small> }
          </div>

          <div class="field">
            <label for="prenom">Prénom</label>
            <input id="prenom" formControlName="prenom"  [class.invalid]="invalid('prenom')" />
            @if (invalid('prenom')) { <small>Le prénom est obligatoire</small> }
          </div>
        </div>

        <div class="field">
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" placeholder="nom@exemple.com" [class.invalid]="invalid('email')" />
          @if (invalid('email')) { <small>Email invalide</small> }
        </div>

        <div class="field">
          <label for="mdp">Mot de passe</label>
          <input id="mdp" type="password" formControlName="motDePasse" placeholder="8 caractères minimum" [class.invalid]="invalid('motDePasse')" />
          @if (invalid('motDePasse')) { <small>8 caractères minimum</small> }
        </div>

        <div class="row">
          <div class="field">
            <label for="numero">Téléphone</label>
            <input id="numero" formControlName="numero"  />
          </div>

          <div class="field">
            <label for="niveau">Niveau d'études</label>
            <select id="niveau" formControlName="niveau">
              <option value="">Choisir</option>
              <option>Bac</option>
              <option>Licence</option>
              <option>Master</option>
              <option>Doctorat</option>
            </select>
          </div>
        </div>

        @if (error()) { <div class="alert alert-error">{{ error() }}</div> }
        @if (success()) { <div class="alert alert-ok">Compte créé avec succès !</div> }

        <button type="submit" [disabled]="loading()">
          {{ loading() ? 'Création...' : "S'inscrire" }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px 16px;
      gap: 24px;
    }

    .brand { text-align: center; color: #ffffff; }
    .logo {
      width: 64px; height: 64px; margin: 0 auto 12px;
      border-radius: 50%;
      background: #4f46e5;
      display: flex; align-items: center; justify-content: center;
      font-size: 30px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
    .brand h1 { margin: 0; font-size: 38px; letter-spacing: 0.5px; }
    .brand p { margin: 4px 0 0; color: #c7c9ff; font-size: 16px; }

    .card {
      width: 100%;
      max-width: 480px;
      background: #ffffff;
      border-radius: 16px;
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
    }
    .card h2 { margin: 0; font-size: 24px; color: #14154b; }
    .subtitle { margin: -8px 0 4px; color: #5a5f87; font-size: 14px; }

    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .field { display: flex; flex-direction: column; gap: 6px; }

    label { font-size: 14px; font-weight: 600; color: #14154b; }

    input, select {
      width: 100%;
      padding: 11px 12px;
      font-size: 15px;
      color: #14154b;
      background: #f7f7ff;
      border: 1.5px solid #d9dbf5;
      border-radius: 10px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    }
    input::placeholder { color: #9a9ec4; }
    input:focus, select:focus {
      background: #ffffff;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.18);
    }
    input.invalid { border-color: #c4260f; background: #fff6f4; }

    small { color: #c4260f; font-size: 13px; }

    .alert { padding: 11px 14px; border-radius: 10px; font-size: 14px; font-weight: 600; }
    .alert-error { background: #fde8e4; color: #9d1d0b; }
    .alert-ok { background: #def7e8; color: #146c3a; }

    button {
      margin-top: 4px;
      padding: 13px;
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
      background: #4f46e5;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
    }
    button:hover:not(:disabled) { background: #3f37c9; }
    button:active:not(:disabled) { transform: scale(0.98); }
    button:disabled { background: #9a9ec4; cursor: not-allowed; }

    @media (max-width: 520px) {
      .row { grid-template-columns: 1fr; }
      .card { padding: 24px; }
    }
  `],
})
export class RegisterCandidat {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  loading = signal(false);
  error = signal('');
  success = signal(false);

  form = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required, Validators.minLength(8)]],
    numero: [''],
    niveau: [''],
  });

  invalid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  submit(): void {
    this.error.set('');
    this.success.set(false);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.auth.registerCandidat(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        this.form.reset();
      },
      error: (e: HttpErrorResponse) => {
        this.loading.set(false);
        if (e.status === 409) {
          this.error.set(e.error.message);
        } else if (e.status === 0) {
          this.error.set('Serveur injoignable. Le backend est-il démarré ?');
        } else {
          this.error.set('Une erreur est survenue. Réessayez.');
        }
      },
    });
  }
}