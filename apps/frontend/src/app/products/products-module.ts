import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsRoutingModule } from './products-routing-module';
import { ProductListComponent } from './product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { AddToCartButtonComponent } from './add-to-cart-button/add-to-cart-button.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { EditProductButtonComponent } from './edit-product-button/edit-product-button.component';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductCardComponent,
        ProductListComponent,
        AddToCartButtonComponent,
        EditProductButtonComponent,
    ],
    imports: [
        ProductsRoutingModule,
        CardModule,
        CommonModule,
        ButtonModule,
        PaginatorModule,
        ProgressSpinnerModule,
        ToastModule,
        TooltipModule,
    ],
    exports: [ProductsComponent, ProductListComponent],
    providers: [MessageService],
})
export class ProductsModule {}
