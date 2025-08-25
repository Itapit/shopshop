import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AnalyticsComponent } from './analytics.component';
import { ChartsModule } from './charts/chart.module';
import { DateRangeFilterModule } from './date-range-filter/date-range.module';
import { FireworksOnDirective } from './directives/fireworks-on.directive';
import { SalesAnalyticsModule } from './sales/sales-analytics.module';
import { AnalyticsDateRangeEffects } from './store/analytics.effects';
import { analyticsReducer } from './store/analytics.reducer';
import { analyticsFeatureKey } from './store/analytics.state';

@NgModule({
    declarations: [AnalyticsComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature(analyticsFeatureKey, analyticsReducer),
        EffectsModule.forFeature(AnalyticsDateRangeEffects),
        DateRangeFilterModule,
        FireworksOnDirective,
        ChartsModule,
        SalesAnalyticsModule,
    ],
    exports: [AnalyticsComponent],
})
export class AnalyticsModule {}
