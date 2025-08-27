import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CandleIntervalFilterModule } from '../candle-interval-filter/candle-interval-filter.module';
import { DateRangeFilterModule } from '../date-range-filter/date-range.module';
import { GenericGraphsModule } from '../generic-graphs/generic-graphs.module';
import { SalesKpiListComponent } from './kpi-list/sales-kpi-list.component';
import { SalesMasterListComponent } from './sales-master-list.component';
import { SalesAnalyticsEffects } from './store/sales-analytics.effects';
import { salesAnalyticsReducer } from './store/sales-analytics.reducer';
import { salesAnalyticsFeatureKey } from './store/sales-analytics.state';
import { FireworksOnDirective } from "../analytics-master/directives/fireworks-on.directive";

@NgModule({
    imports: [
    CommonModule,
    StoreModule.forFeature(salesAnalyticsFeatureKey, salesAnalyticsReducer),
    EffectsModule.forFeature(SalesAnalyticsEffects),
    GenericGraphsModule,
    DateRangeFilterModule,
    CandleIntervalFilterModule,
    DividerModule,
    CardModule,
    FireworksOnDirective
],
    declarations: [SalesMasterListComponent, SalesKpiListComponent],
    exports: [SalesMasterListComponent],
})
export class SalesAnalyticsModule {}
