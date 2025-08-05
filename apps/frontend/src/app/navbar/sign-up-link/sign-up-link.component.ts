import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-sign-up-link',
    standalone: false,
    templateUrl: './sign-up-link.component.html',
    styleUrl: './sign-up-link.component.css',
})
export class SignUpLinkComponent {
    buttonText = signal('Create User');
}
