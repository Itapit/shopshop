import { Component } from '@angular/core';
import { DateRangeOptions } from './date-range-filter';

@Component({
    selector: 'app-analytics',
    standalone: false,
    templateUrl: './analytics.component.html',
    styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {
    DateRangeOptions = DateRangeOptions; // expose the enum to html
}
