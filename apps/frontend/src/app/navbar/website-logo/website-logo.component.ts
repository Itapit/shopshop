import { Component } from '@angular/core';
import { SharedService } from '../../shared/ui-state.service';

@Component({
    selector: 'app-website-logo',
    standalone: false,
    templateUrl: './website-logo.component.html',
    styleUrl: './website-logo.component.css',
})
export class WebsiteLogoComponent {
    constructor(private sharedService: SharedService) {}

    logoClick() {
        this.sharedService.triggerLogo();
    }
}
