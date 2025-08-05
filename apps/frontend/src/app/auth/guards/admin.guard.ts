import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { Role } from '@common/Enums';

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
