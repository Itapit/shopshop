import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Role } from '@common/Enums';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { selectRole } from '../store/auth.selectors';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store
    ) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        const expected = route.data['expectedRole'] as Role | Role[] | undefined;

        return this.store.select(selectRole).pipe(
            take(1),
            map((userRole) => {
                if (!expected) return true;

                const hasAccess = Array.isArray(expected)
                    ? !!userRole && expected.includes(userRole)
                    : userRole === expected;

                return hasAccess || this.router.createUrlTree(['/']);
            })
        );
    }
}
