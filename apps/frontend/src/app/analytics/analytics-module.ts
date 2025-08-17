import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnalyticsComponent } from './analytics.component';

@NgModule({
    declarations: [AnalyticsComponent],
    imports: [CommonModule],
    exports: [AnalyticsComponent],
})
export class AnalyticsModule {}
