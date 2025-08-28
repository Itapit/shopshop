import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SalesAnalyticsModule } from '../sales/sales-analytics.module';
import { AnalyticsMasterComponent } from './analytics-master.component';
import { FireworksOnDirective } from './directives/fireworks-on.directive';
import { AnalyticsDateRangeEffects } from './store/analytics.effects';
import { analyticsReducer } from './store/analytics.reducer';
import { analyticsFeatureKey } from './store/analytics.state';

@NgModule({
    declarations: [AnalyticsMasterComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature(analyticsFeatureKey, analyticsReducer),
        EffectsModule.forFeature(AnalyticsDateRangeEffects),
        FireworksOnDirective,
        SalesAnalyticsModule,
    ],
    exports: [],
})
export class AnalyticsMasterModule {}
