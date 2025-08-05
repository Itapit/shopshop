import { NgModule } from '@angular/core';
import { ProductsModule } from '../products/products-module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ProductsModule, CommonModule],
    declarations: [],
    exports: [],
})
export class OrderModule {}
