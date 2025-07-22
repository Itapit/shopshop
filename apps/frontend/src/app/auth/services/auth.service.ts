import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInDto } from 'common/src/lib/DTOs/sign-In.dto';
import { SignInResponseDTO } from 'common/src/lib/DTOs/sign-In-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = `${environment.BACKEND_BASE_URL}/auth`;

  constructor(private readonly http: HttpClient) {}
  
  signIn(dto: SignInDto): Observable<SignInResponseDTO> {
    return this.http.post<SignInResponseDTO>(`${this.baseUrl}/login`, dto);
  }
}
