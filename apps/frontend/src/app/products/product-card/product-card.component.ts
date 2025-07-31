import { Component, Input } from "@angular/core";
import { ProductBase } from "@common/Interfaces";

@Component({
  selector: "app-product-card",
  standalone: false,
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent{
    @Input() mode!: 'view' | 'cart';
    @Input() product!: ProductBase;
    
}