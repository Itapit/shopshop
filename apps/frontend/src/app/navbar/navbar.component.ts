import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role } from '@common/Enums';
import { Subscription } from 'rxjs';
import { AuthSession } from '../auth/auth-session.interface';
import { SessionService } from '../auth/services/Session.service';
import { UiStateService } from '../shared/ui-state.service';

@Component({
    selector: 'app-navbar',
    standalone: false,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
    constructor(
        private uiStateService: UiStateService,
        private sessionService: SessionService
    ) {}

    currentRole!: Role;

    showSignInLink: boolean = true;
    showOrderLink: boolean = false;
    showSignUpLink: boolean = false;
    showStatsLink: boolean = false;
    showCartLink: boolean = false;
    showSearch: boolean = true;
    showLogoutLink: boolean = true;

    private userSub!: Subscription;

    ngOnInit(): void {
        this.userSub = this.sessionService.sessionObservable$.subscribe((session: AuthSession | null) => {
            if (session?.role) {
                this.currentRole = session.role;
                
            }
            if (this.currentRole === Role.Client) {
                this.showCartLink = true;
                this.showLogoutLink = true;
            }
            if (this.currentRole === Role.Admin) {
                this.showSignUpLink = true;
                this.showStatsLink = true;
                this.showLogoutLink = true;
            }
            this.showSignInLink = !session;
        });

        this.uiStateService.cartClicked$.subscribe(() => {
            this.showOrderLink = true;
            this.showCartLink = false;
            this.showSearch = false;
        });

        this.uiStateService.logoClicked$.subscribe(() => {
            if (this.currentRole === Role.Client) {
                this.showOrderLink = false;
                this.showCartLink = true;
                this.showSearch = true;
            }
            if (this.currentRole === Role.Admin) {
                this.showSearch = true;
            }
        });

        this.uiStateService.statsClicked$.subscribe(() => {
            this.showSearch = false;
        });

        this.uiStateService.signupClicked$.subscribe(() => {
            this.showSearch = false;
        });
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}
