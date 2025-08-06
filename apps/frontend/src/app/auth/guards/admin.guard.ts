import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Role } from '@common/Enums';
import { SessionService } from '../services/Session.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private sessionService: SessionService,
        private router: Router
    ) {}

    canActivate(): boolean {
        const role = this.sessionService.getRole();
        if (role === Role.Admin) {
            return true;
        }
        this.router.navigate(['/auth/unauthorized']);
        return false;
    }
}
