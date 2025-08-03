import { Component, Input, OnInit } from "@angular/core";
import { ProductFull } from "@common/Interfaces";
import { productListOptionsEnum } from "../product-list/product-list-options-enum";
import { ProductsHttpService } from "../services/products-http.service";

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

  productListOptionsEnum = productListOptionsEnum; //expose the enum to the html

  loadProduct() {
    this.productService.getProductById(this.product.productID).subscribe((response) => {
      this.product = response.product;
    });
  }
}