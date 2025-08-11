import { Component } from '@angular/core';
import { NavigationService } from '../../shared/navigation.service';

@Component({
    selector: 'app-website-logo',
    standalone: false,
    templateUrl: './website-logo.component.html',
    styleUrl: './website-logo.component.css',
})
export class WebsiteLogoComponent {
    constructor(private nav: NavigationService) {}

    logoClick() {
        this.nav.toProductsHome();
    }
}
