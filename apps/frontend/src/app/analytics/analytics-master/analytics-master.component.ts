import { Component } from '@angular/core';

@Component({
    selector: 'app-analytics-master',
    standalone: false,
    templateUrl: './analytics-master.component.html',
    styleUrl: './analytics-master.component.css',
})
export class AnalyticsMasterComponent {
    celebrate = true;

    triggerFireworks() {
        this.celebrate = !this.celebrate;
    }
}
