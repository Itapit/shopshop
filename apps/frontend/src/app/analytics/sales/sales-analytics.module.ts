import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SalesGraphsListComponent } from './sales-graphs-list.component';
import { SalesAnalyticsEffects } from './sales-store/sales-analytics.effects';
import { salesAnalyticsReducer } from './sales-store/sales-analytics.reducer';
import { salesAnalyticsFeatureKey } from './sales-store/sales-analytics.state';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(salesAnalyticsFeatureKey, salesAnalyticsReducer),
        EffectsModule.forFeature(SalesAnalyticsEffects),
    ],
    declarations: [SalesGraphsListComponent],
    exports: [SalesGraphsListComponent],
})
export class SalesAnalyticsModule {}
