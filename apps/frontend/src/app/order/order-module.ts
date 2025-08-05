import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsModule } from '../products/products-module';

@NgModule({
    imports: [ProductsModule, CommonModule],
    declarations: [],
    exports: [],
})
export class OrderModule {}
