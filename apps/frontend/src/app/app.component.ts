import { Component, OnInit } from '@angular/core';
import { TokenService } from './auth/services/token.service';
import { SharedService } from './shared/shared.service';
import { AuthSession } from './auth/auth-session.interface';

@Component({
    selector: 'app-root',
    standalone: false,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    protected title = 'frontend';

    constructor(
        private tokenService: TokenService,
        private sharedService: SharedService
    ) {}
    ngOnInit(): void {
        const session: AuthSession | null = this.tokenService.getSession();
        this.sharedService.setUserData(session);
    }
}
