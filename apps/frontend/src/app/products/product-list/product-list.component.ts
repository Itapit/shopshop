import { Component, Input } from "@angular/core";
import {ProductBase} from '@common/Interfaces';
import { productListOptionsEnum } from "./product-list-options-enum";
@Component({
  selector: "app-product-list",
    standalone: false,
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent {
  @Input() mode!: productListOptionsEnum ; // 'view' or 'cart'
  @Input() products!: ProductBase[];

  productListOptionsEnum = productListOptionsEnum;
}