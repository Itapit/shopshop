import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductsModule } from '../products/products-module';
import { OrderEffects } from './state/order.effects';
import { orderFeature } from './state/order.reducer';

@NgModule({
    imports: [
        ProductsModule,
        CommonModule,
        StoreModule.forFeature(orderFeature),
        EffectsModule.forFeature([OrderEffects]),
    ],
    declarations: [],
    exports: [],
})
export class OrderModule {}
