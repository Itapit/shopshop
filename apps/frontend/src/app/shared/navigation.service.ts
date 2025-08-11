import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    constructor(private router: Router) {}

    toCart() {
        return this.router.navigate(['/cart']);
    }
    toSignIn() {
        return this.router.navigate(['/auth/signin']);
    }
    toSignUp() {
        return this.router.navigate(['/auth/signup']);
    }
    toAdminStats() {
        return this.router.navigate(['/admin/stats']);
    }
}
