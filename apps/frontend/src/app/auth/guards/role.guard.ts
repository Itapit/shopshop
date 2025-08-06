import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { NavigationService } from '../../shared/navigation.service';
import { SessionService } from '../services/Session.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
        private navigationService: NavigationService,
        private sessionService: SessionService
    ) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data['expectedRole'];
        const userRole = this.sessionService.getRole();
        if (userRole === expectedRole) {
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
