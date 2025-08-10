import { Injectable } from '@angular/core';
import { Role } from '@common/Enums';
import { BehaviorSubject } from 'rxjs';
import { AuthSession } from '../auth-session.interface';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
    constructor(private authService: AuthService) {}

    private session$ = new BehaviorSubject<AuthSession | null>(null);
    public readonly sessionObservable$ = this.session$.asObservable();

    setSessionFromProfile(): void {
        this.authService.getSession().subscribe({
            next: (session) => this.setSession(session),
            error: () => this.clearSession(),
        });
    }

    setSession(session: AuthSession | null): void {
        this.session$.next(session);
    }

    getSession(): AuthSession | null {
        return this.session$.value;
    }

    clearSession(): void {
        this.session$.next(null);
    }

    getRole(): Role | null {
        return this.getSession()?.role ?? null;
    }

    getEmail(): string | null {
        return this.getSession()?.email ?? null;
    }

    getUsername(): string | null {
        return this.getSession()?.username ?? null;
    }

    isLoggedIn(): boolean {
        return !!this.getSession();
    }
}
