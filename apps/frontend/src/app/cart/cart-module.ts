import { NgModule } from '@angular/core';
import { ProductsModule } from '../products/products-module';
import { CartComponent } from './cart.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { CartRoutingModule } from './cart-routing-module';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        ProductsModule,
        ButtonModule,
        PaginatorModule,
        CartRoutingModule,
        CommonModule,
        ToastModule,
    ],
    declarations: [CartComponent],
    exports: [],
})
export class CartModule {}
