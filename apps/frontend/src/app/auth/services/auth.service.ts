import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    CreateUserRequest,
    CreateUserResponse,
    GetProfileResponse,
    SignInRequest,
    SignInResponse,
} from '@common/Interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly baseUrl = `${environment.BACKEND_BASE_URL}`;

    constructor(private readonly http: HttpClient) {}

    signIn(dto: SignInRequest): Observable<SignInResponse> {
        return this.http.post<SignInResponse>(`${this.baseUrl}/auth/signin`, dto);
    }

    signUp(dto: CreateUserRequest): Observable<CreateUserResponse> {
        return this.http.post<CreateUserResponse>(`${this.baseUrl}/users`, dto);
    }

    getSession(): Observable<GetProfileResponse> {
        return this.http.get<GetProfileResponse>(`${this.baseUrl}/auth/profile`);
    }

    logout(): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/logout`, { withCredentials: true });
    }
}
