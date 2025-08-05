import { Injectable } from '@angular/core';
import { Role } from '@common/Enums';
import { AuthSession } from '../auth-session.interface';

@Injectable({ providedIn: 'root' })
export class TokenService {
    private sessionKey = 'authSession';

    saveSession(session: AuthSession): void {
        localStorage.setItem(this.sessionKey, JSON.stringify(session));
    }

    getSession(): AuthSession | null {
        const raw = localStorage.getItem(this.sessionKey);
        if (!raw) return null;
        try {
            return JSON.parse(raw) as AuthSession;
        } catch {
            return null;
        }
    }

    removeSession(): void {
        localStorage.removeItem(this.sessionKey);
    }

    getToken(): string {
        return this.getSession()?.token || '';
    }

    getRole(): Role | '' {
        return this.getSession()?.role || '';
    }
}
