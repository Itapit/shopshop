import { Component, Input } from "@angular/core";
import { productListOptionsEnum } from "./product-list-options-enum";
import { ProductDto } from "@common/DTOs";
@Component({
  selector: "app-product-list",
    standalone: false,
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent {
  @Input() mode!: productListOptionsEnum ; // 'view' or 'cart'
  @Input() products!: ProductDto[];

  productListOptionsEnum = productListOptionsEnum;
}