import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { DateRangeFilterModule } from '../date-range-filter/date-range.module';
import { ChartCardWrapperComponent } from './chart-card-wrapper/chart-card-wrapper.component';
import { ChartCardComponent } from './chart-card/chart-card.component';

@NgModule({
    declarations: [ChartCardComponent, ChartCardWrapperComponent],
    imports: [CommonModule, DateRangeFilterModule, ChartModule, SkeletonModule],
    exports: [ChartCardComponent, ChartCardWrapperComponent],
})
export class ChartsModule {}
