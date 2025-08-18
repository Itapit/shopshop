import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AnalyticsComponent } from './analytics.component';
import { DateRangeFilterModule } from './date-range-filter/date-range.module';
import { analyticsReducer } from './store/analytics.reducer';
import { analyticsFeatureKey } from './store/analytics.state';

@NgModule({
    declarations: [AnalyticsComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature(analyticsFeatureKey, analyticsReducer),
        EffectsModule.forFeature(AnimationEffect),
        DateRangeFilterModule,
    ],
    exports: [AnalyticsComponent],
})
export class AnalyticsModule {}
