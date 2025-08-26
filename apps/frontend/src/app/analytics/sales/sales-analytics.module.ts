import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CandleIntervalFilterModule } from '../candle-interval-filter/candle-interval-filter.module';
import { DateRangeFilterModule } from '../date-range-filter/date-range.module';
import { GenericGraphsModule } from '../generic-graphs/generic-graphs.module';
import { SalesGraphsListComponent } from './sales-graphs-list.component';
import { SalesAnalyticsEffects } from './store/sales-analytics.effects';
import { salesAnalyticsReducer } from './store/sales-analytics.reducer';
import { salesAnalyticsFeatureKey } from './store/sales-analytics.state';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(salesAnalyticsFeatureKey, salesAnalyticsReducer),
        EffectsModule.forFeature(SalesAnalyticsEffects),
        GenericGraphsModule,
        DateRangeFilterModule,
        CandleIntervalFilterModule,
    ],
    declarations: [SalesGraphsListComponent],
    exports: [SalesGraphsListComponent],
})
export class SalesAnalyticsModule {}
