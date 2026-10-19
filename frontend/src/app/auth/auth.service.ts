import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterCandidatRequest {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  numero?: string;
  niveau?: string;
}

export interface CandidatResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  numero?: string;
  niveau?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api';

  registerCandidat(data: RegisterCandidatRequest): Observable<CandidatResponse> {
    return this.http.post<CandidatResponse>(`${this.apiUrl}/auth/register/candidat`, data);
  }
}