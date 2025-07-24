import { Component, Input } from "@angular/core";

@Component({
  selector: "app-product-card",
  standalone: false,
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent{
    @Input() mode!: 'view' | 'cart';
    @Input() product!: {
        name: string;
        price: number;
        description: string;
        quantity: number;
        imageUrl: string;

    } 
    
}