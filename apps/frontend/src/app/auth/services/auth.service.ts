import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = `${environment.BACKEND_BASE_URL}/auth`;

  constructor(private readonly http: HttpClient) {}

  signIn(dto: signInDto): Observable<signInResponseDTO> {
    return this.http.post<signInResponseDTO>(`${this.baseUrl}/signup`, dto);
  }
}
