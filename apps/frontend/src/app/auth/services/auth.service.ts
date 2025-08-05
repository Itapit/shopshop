import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    CreateUserRequest,
    CreateUserResponse,
    SignInRequest,
    SignInResponse,
} from '@common/Interfaces';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly baseUrl = `${environment.BACKEND_BASE_URL}`;

    constructor(private readonly http: HttpClient) {}

    signIn(dto: SignInRequest): Observable<SignInResponse> {
        return this.http.post<SignInResponse>(
            `${this.baseUrl}/auth/login`,
            dto
        );
    }

    signUp(dto: CreateUserRequest): Observable<CreateUserResponse> {
        return this.http.post<CreateUserResponse>(`${this.baseUrl}/users`, dto);
    }
}
