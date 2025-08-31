import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { AddToCartButtonComponent } from './add-to-cart-button/add-to-cart-button.component';
import { EditProductButtonComponent } from './edit-product-button/edit-product-button.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing-module';
import { ProductsComponent } from './products.component';
import { ProductsEffects } from './store/products.effects';
import { productsFeature } from './store/products.reducer';

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
        TooltipModule,
        StoreModule.forFeature(productsFeature),
        EffectsModule.forFeature([ProductsEffects]),
        SkeletonModule,
        ProgressSpinnerModule,
    ],
    exports: [ProductsComponent, ProductListComponent],
    providers: [MessageService],
})
export class ProductsModule {}
