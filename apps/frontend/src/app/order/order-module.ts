import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsModule } from '../products/products-module';
import { StoreModule } from '@ngrx/store';
import { orderFeature } from './state/order.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './state/order.effects';

@NgModule({
    imports: [ProductsModule, CommonModule ,StoreModule.forFeature(orderFeature), EffectsModule.forFeature([OrderEffects]),   ],
    declarations: [],
    exports: [],
})
export class OrderModule {}
