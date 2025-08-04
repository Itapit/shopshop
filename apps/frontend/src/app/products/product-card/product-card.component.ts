import { Component, Input, OnInit } from "@angular/core";
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

  constructor(private productService: ProductsHttpService, private cartService: CartService, private router: Router) {}
  
  quantity = 0;
  productListOptionsEnum = productListOptionsEnum; //expose the enum to the html

  loadProduct() {
    this.productService.getProductById(this.product.productID).subscribe((response) => {
      this.product = response.product;
    });
  }

  removeItemFromCart(){
    const item : ProductItem = {productID: this.product.productID , quantity: this.quantity};
    this.cartService.updateCartItemQuantity(item);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['cart']);
    });
  }
 }

