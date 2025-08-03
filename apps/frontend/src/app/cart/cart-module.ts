import { NgModule } from "@angular/core";
import { ProductsModule } from "../products/products-module";
import { CartComponent } from "./cart.component";
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    imports: [ProductsModule , ButtonModule , PaginatorModule],
    declarations: [CartComponent],
    exports: [],
})
export class CartModule {
 
}