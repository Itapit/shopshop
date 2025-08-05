import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { NavigationService } from '../../shared/navigation.service';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private navigationService: NavigationService,
        private tokenService: TokenService
    ) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data['expectedRole'];
        const userRole = this.tokenService.getRole();
        if (userRole === expectedRole) {
            console.log('good route');
            return true;
        }

        console.log('bad route');
        const fallback = this.navigationService.getPreviousUrl();
        if (!fallback || fallback.trim() === '' || fallback === route.routeConfig?.path) {
            this.router.navigate(['/']); 
        } else {
            this.router.navigateByUrl(fallback);
        }
        return false;
    }
}
