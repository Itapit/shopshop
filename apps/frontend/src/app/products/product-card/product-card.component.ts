import { Component, Input, OnInit } from "@angular/core";
import { ProductBase } from "@common/Interfaces";
import { productListOptionsEnum } from "../product-list/product-list-options-enum";

@Component({
  selector: "app-product-card",
  standalone: false,
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent implements OnInit{
  @Input() mode!: productListOptionsEnum;
  @Input() product!: ProductBase;

  productListOptionsEnum = productListOptionsEnum; //expose the enum to the html
  ngOnInit(): void {
    console.log(this.mode)
  }
}