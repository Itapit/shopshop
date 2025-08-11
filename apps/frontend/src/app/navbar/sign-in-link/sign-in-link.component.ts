import { Component, signal } from '@angular/core';
import { NavigationService } from '../../shared/navigation.service';

@Component({
    selector: 'app-sign-in-link',
    standalone: false,
    templateUrl: './sign-in-link.component.html',
    styleUrl: './sign-in-link.component.css',
})
export class SignInLinkComponent {
    constructor(private nav: NavigationService) {}

    toSignIn(): void {
        this.nav.toSignIn();
    }

    buttonText = signal('Sign in');
}
