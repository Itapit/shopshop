import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { ProductsModule } from '../products/products-module';
import { CartRoutingModule } from './cart-routing-module';
import { CartComponent } from './cart.component';
import { StoreModule } from '@ngrx/store';
import { cartFeature } from './state/cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './state/cart.effects';

@NgModule({
    imports: [ProductsModule, ButtonModule, PaginatorModule, CartRoutingModule, CommonModule, ToastModule,
        StoreModule.forFeature(cartFeature),
        EffectsModule.forFeature([CartEffects]),
    ],
    declarations: [CartComponent],
    exports: [],
})
export class CartModule {}
