import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ProductsModule } from '../products/products-module';
import { CartRoutingModule } from './cart-routing-module';
import { CartComponent } from './cart.component';
import { CartEffects } from './state/cart.effects';
import { cartFeature } from './state/cart.reducer';
import { ProgressSpinnerModule } from "primeng/progressspinner";

@NgModule({
    imports: [
    ProductsModule,
    ButtonModule,
    PaginatorModule,
    CartRoutingModule,
    CommonModule,
    StoreModule.forFeature(cartFeature),
    EffectsModule.forFeature([CartEffects]),
    ProgressSpinnerModule
],
    declarations: [CartComponent],
    exports: [],
})
export class CartModule {}
