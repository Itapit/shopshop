import { Component } from '@angular/core';
import { UiStateService } from '../../shared/ui-state.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout-listener',
    standalone: false,
    templateUrl: './log-out.component.html',
    styleUrls: ['./log-out.component.css'],
})
export class LogoutListenerComponent {
    constructor(
        private uiStateService: UiStateService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        
        this.uiStateService.logoutClicked$.subscribe(() => {
            this.handleLogOut();
        });
    }
    handleLogOut(): void {
        
        this.authService.logout().subscribe({
            next: (res) => {
                console.log('Logout successful', res);
                this.router.navigate(['/']);
                window.location.reload();
            },
            error: (err) => {
                console.error('Logout failed', err);
            },
        });
    }
}
