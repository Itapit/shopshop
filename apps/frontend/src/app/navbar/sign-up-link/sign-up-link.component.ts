import { Component, signal } from '@angular/core';
import { NavigationService } from '../../shared/navigation.service';

@Component({
    selector: 'app-sign-up-link',
    standalone: false,
    templateUrl: './sign-up-link.component.html',
    styleUrl: './sign-up-link.component.css',
})
export class SignUpLinkComponent {
    constructor(private nav: NavigationService) {}

    toSignup(): void {
        this.nav.toSignUp();
    }

    buttonText = signal('Create User');
}
