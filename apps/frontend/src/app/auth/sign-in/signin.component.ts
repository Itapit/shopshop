import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInRequest } from '@common/Interfaces';
import { AuthFacade } from '../store/auth.facade';

@Component({
    selector: 'app-signin',
    standalone: false,
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
    readonly authStore = inject(AuthFacade);

    constructor(
        private destroyRef: DestroyRef,
        private router: Router
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

    loading$ = this.authStore.loading$;
    error$ = this.authStore.error$;
    isLoggedIn$ = this.authStore.isLoggedIn$;

    ngOnInit(): void {
        this.isLoggedIn$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((logged) => {
            if (logged) this.router.navigateByUrl('/');
        });
    }

    onSignin(form: NgForm) {
        if (form.invalid) {
            form.control.markAllAsTouched();
            return;
        }
        const dto: SignInRequest = { email: this.email ?? '', password: this.password ?? '' };
        this.authStore.signIn(dto);
    }
}
