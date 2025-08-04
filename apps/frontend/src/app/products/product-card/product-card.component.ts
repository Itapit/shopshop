import { Component, Input } from "@angular/core";
import {  ProductFull, ProductItem } from "@common/Interfaces";
import { productListOptionsEnum } from "../product-list/product-list-options-enum";
import { CartService } from "../../cart/services/cart.service";

@Component({
  selector: "app-product-card",
  standalone: false,
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent{
  @Input() mode!: productListOptionsEnum;
  @Input() product!: ProductFull;
  
  quantity = 0;
  constructor(private cartService: CartService){}

  productListOptionsEnum = productListOptionsEnum; //expose the enum to the html
  removeItemFromCart(){
     console.log("productID", this.product.productID , "  product: " , this.product);
     const item : ProductItem = {productID: this.product.productID , quantity: this.quantity};
     console.log("remove item:" ,item);
     console.log("ojsndjons");
     this.cartService.updateCartItemQuantity(item);
  }
}