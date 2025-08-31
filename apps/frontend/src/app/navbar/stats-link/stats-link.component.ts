import { Component, signal } from '@angular/core';
import { NavigationService } from '../../shared/navigation.service';

@Component({
    selector: 'app-stats-link',
    standalone: false,
    templateUrl: './stats-link.component.html',
    styleUrl: './stats-link.component.css',
})
export class StatsLinkComponent {
    constructor(private nav: NavigationService) {}

    toAdminStats(): void {
        this.nav.toAdminStats();
    }

    buttonText = signal('Analytics');
}
