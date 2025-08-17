import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnalyticsComponent } from './analytics.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { SalesOverTimeComponent } from './sales-over-time/sales-over-time.component';

@NgModule({
    declarations: [AnalyticsComponent, SalesOverTimeComponent, DateRangeComponent],
    imports: [CommonModule],
    exports: [AnalyticsComponent],
})
export class AnalyticsModule {}
