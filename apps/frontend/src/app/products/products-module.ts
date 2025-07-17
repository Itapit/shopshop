import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing-module';
import { ProductListComponent } from './product-list.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [ProductListComponent, ProductListComponent],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
