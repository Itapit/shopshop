import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SalesAnalyticsEffects } from './sales-store/sales-analytics.effects';
import { salesAnalyticsReducer } from './sales-store/sales-analytics.reducer';
import { salesAnalyticsFeatureKey } from './sales-store/sales-analytics.state';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(salesAnalyticsFeatureKey, salesAnalyticsReducer),
        EffectsModule.forFeature(SalesAnalyticsEffects),
    ],
    exports: [],
})
export class SalesAnalyticsModule {}
