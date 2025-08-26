import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { DateRangeFilterModule } from '../date-range-filter/date-range.module';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { GraphWrapperComponent } from './graph-wrapper/graph-wrapper.component';

@NgModule({
    declarations: [BarGraphComponent, GraphWrapperComponent],
    imports: [CommonModule, DateRangeFilterModule, ChartModule, SkeletonModule],
    exports: [GraphWrapperComponent],
})
export class GenericGraphsModule {}
