import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { ProductsModule } from '../products/products-module';
import { CartRoutingModule } from './cart-routing-module';
import { CartComponent } from './cart.component';

@NgModule({
    imports: [ProductsModule, ButtonModule, PaginatorModule, CartRoutingModule, CommonModule, ToastModule],
    declarations: [CartComponent],
    exports: [],
})
export class CartModule {}
