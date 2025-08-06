import { Component, signal } from '@angular/core';
import { UiStateService } from '../../shared/ui-state.service';

@Component({
    selector: 'app-stats-link',
    standalone: false,
    templateUrl: './stats-link.component.html',
    styleUrl: './stats-link.component.css',
})
export class StatsLinkComponent {
    constructor(private uiStateService: UiStateService) {}
    buttonText = signal('Statistics');

    statsClick() {
        this.uiStateService.triggerStats();
    }
}
