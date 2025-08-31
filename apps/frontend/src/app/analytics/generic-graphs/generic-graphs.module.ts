import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { DateRangeFilterModule } from '../date-range-filter/date-range.module';
import { GraphWrapperComponent } from './graph-wrapper/graph-wrapper.component';
import { GraphComponent } from './graph/graph.component';
import { KpiTileComponent } from './kpi-tile/kpi-tile.component';
@NgModule({
    declarations: [GraphComponent, GraphWrapperComponent, KpiTileComponent],
    imports: [CommonModule, DateRangeFilterModule, ChartModule, SkeletonModule, CardModule],
    exports: [GraphWrapperComponent, KpiTileComponent, GraphComponent],
})
export class GenericGraphsModule {}
