import { Component, Input, OnInit } from "@angular/core";
import { ProductFull } from "@common/Interfaces";
import { productListOptionsEnum } from "../product-list/product-list-options-enum";
import { ProductsHttpService } from "../services/products-http.service";
import { CartService } from "../../cart/services/cart.service";
import { Route, Router } from "@angular/router";

@Component({
  selector: "app-product-card",
  standalone: false,
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent {
  @Input() mode!: productListOptionsEnum;
  @Input() product!: ProductFull;

  constructor(private productService: ProductsHttpService) {}
  @Input() product!: ProductFull;
  
  quantity = 0;
  constructor(private cartService: CartService , private router : Router){}

  productListOptionsEnum = productListOptionsEnum; //expose the enum to the html

  loadProduct() {
    this.productService.getProductById(this.product.productID).subscribe((response) => {
      this.product = response.product;
    });
  }
}
  productListOptionsEnum = productListOptionsEnum; 
  removeItemFromCart(){
     console.log("productID", this.product.productID , "  product: " , this.product);
     const item : ProductItem = {productID: this.product.productID , quantity: this.quantity};
     console.log("remove item:" ,item);
     console.log("ojsndjons");
     this.cartService.updateCartItemQuantity(item);
     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['cart']);
     });
  }
 }

