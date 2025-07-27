import { Component, Input } from "@angular/core";
import { Product } from "common/src/lib/Interfaces/product.interface";

@Component({
  selector: "app-product-card",
  standalone: false,
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent{
    @Input() mode!: 'view' | 'cart';
    @Input() product!: Product;
    
}