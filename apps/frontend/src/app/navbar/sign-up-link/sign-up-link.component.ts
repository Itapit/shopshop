import { Component, signal } from '@angular/core';
import { UiStateService } from '../../shared/ui-state.service';

@Component({
    selector: 'app-sign-up-link',
    standalone: false,
    templateUrl: './sign-up-link.component.html',
    styleUrl: './sign-up-link.component.css',
})
export class SignUpLinkComponent {
    constructor(private uiStateService: UiStateService) {}

    buttonText = signal('Create User');

    signupClicked() {
        this.uiStateService.triggerSignUp();
    }
}
