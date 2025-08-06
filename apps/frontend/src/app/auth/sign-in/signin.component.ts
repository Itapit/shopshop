import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInRequest } from '@common/Interfaces';
import { Role } from 'common/src/lib/Enums/role.enum';
import { UiStateService } from '../../shared/ui-state.service';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/Session.service';

@Component({
    selector: 'app-signin',
    standalone: false,
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.css',
})
export class SigninComponent {
    constructor(
        private readonly authService: AuthService,
        private router: Router,
        private sessionService: SessionService,
        private uiStateService: UiStateService
    ) {}

    title = 'Sign In';
    buttonLabel = 'Sign In';
    buttonIcon = 'pi pi-sign-in';

    emailLabel = 'Email';
    emailPlaceholder = 'Enter your email';
    emailRequiredMsg = 'Email is required.';
    emailInvalidMsg = 'Enter a valid email address.';

    passwordLabel = 'Password';
    passwordPlaceholder = 'Enter your password';
    passwordRequiredMsg = 'Password is required.';
    passwordMinLength = 6; // This is for the validator and the string output
    passwordMinLengthMsg = `Password must be at least ${this.passwordMinLength} characters.`;

    email: string | undefined;
    password: string | undefined;

    onSignin(form: NgForm) {
        if (form.invalid) {
            form.control.markAllAsTouched();
            return;
        }
        const dto: SignInRequest = {
            email: this.email ?? '',
            password: this.password ?? '',
        };

        this.authService.signIn(dto).subscribe({
            next: () => this.afterSignInSuccess(),
            error: (err) => {
                console.error('Signin failed', err);
            },
        });
    }

    private afterSignInSuccess(): void {
        this.authService.getSession().subscribe({
            next: (session) => {
                this.sessionService.setSession(session);
                if (session.role == Role.Client || session.role == Role.Admin) {
                    this.router.navigate(['/']);
                }
            },
            error: (err) => {
                console.error(`failed to get session data after sign in`, err);
            },
        });
    } 

    
}
