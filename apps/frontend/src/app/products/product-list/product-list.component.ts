import { Component, Input } from "@angular/core";
import {Product} from 'common/src/lib/Interfaces/product.interface';
@Component({
  selector: "app-product-list",
    standalone: false,
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent {
  @Input() mode!: 'view' | 'cart' ; // Default mode can be set to 'view' or 'cart'
  @Input() products!: Product[];
  


}