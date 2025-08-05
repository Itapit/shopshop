import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Role } from '@common/Enums';
import { TokenService } from '../services/token.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private router: Router
    ) {}

    canActivate(): boolean {
        const role = this.tokenService.getRole();
        if (role === Role.Admin) {
            return true;
        }
        this.router.navigate(['/auth/unauthorized']);
        return false;
    }
}
