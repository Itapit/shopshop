import { NgModule } from "@angular/core";
import { ProductListComponent } from "../products/product-list/product-list.component";
import { ProductsModule } from "../products/products-module";
import { UserComponent } from "./user.component";
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    imports: [ProductsModule , ButtonModule , PaginatorModule],
    declarations: [UserComponent],
    exports: [],
})
export class UserModule {
 
}