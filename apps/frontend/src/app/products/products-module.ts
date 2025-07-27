import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsRoutingModule } from './products-routing-module';
import { ProductListComponent } from './product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ProductsComponent , ProductCardComponent , ProductListComponent],   
  imports: [
    ProductsRoutingModule,
    CardModule,
    CommonModule,
    ButtonModule,
    

  ],
  exports: [ProductsComponent, ProductListComponent ],
})
export class ProductsModule {}