import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ProductFull, ProductItem } from "@common/Interfaces";
import { productListOptionsEnum } from "../product-list/product-list-options-enum";
import { ProductsHttpService } from "../services/products-http.service";
import { CartService } from "../../cart/services/cart.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-card",
  standalone: false,
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent {
  @Input() mode!: productListOptionsEnum;
  @Input() product!: ProductFull;
  @Output() removeClicked = new EventEmitter<string>();

  constructor(private productService: ProductsHttpService, private cartService: CartService, private router: Router) {}
  
  quantity = 0;
  productListOptionsEnum = productListOptionsEnum; //expose the enum to the html

  loadProduct() {
    this.productService.getProductById(this.product.productID).subscribe((response) => {
      this.product = response.product;
    });
  }

  removeItemFromCart(){
     this.removeClicked.emit(this.product.productID);
    
  }
 }

