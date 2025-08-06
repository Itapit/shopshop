import { Component } from '@angular/core';
import { UiStateService } from '../../shared/ui-state.service';

@Component({
    selector: 'app-website-logo',
    standalone: false,
    templateUrl: './website-logo.component.html',
    styleUrl: './website-logo.component.css',
})
export class WebsiteLogoComponent {
    constructor(private uiStateService: UiStateService) {}

    logoClick() {
        this.uiStateService.triggerLogo();
    }
}
