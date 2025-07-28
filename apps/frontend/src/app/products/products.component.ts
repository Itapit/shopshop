import { Component, OnInit } from "@angular/core";
import { productListOptionsEnum } from "./product-list/product-list-options-enum";
import { ProductsHttpService } from "./services/products-http.service";
import { GetProductsListRequestDTO, GetProductsListResponseDTO } from "@common/DTOs";

@Component({
    selector: "app-products",
    standalone: false,
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductsHttpService) {}
  productListOptionsEnum = productListOptionsEnum; //expose the enum to the html
  productsResponse: GetProductsListResponseDTO | null = null

  ngOnInit(): void {
    const requestDto: GetProductsListRequestDTO = { //TODO fix this hardcoded so the user can select page
      page:1,
      limit:10
    }

    this.productService.getProducts(requestDto).subscribe({
      next: (response) => {
        this.productsResponse = response;
        console.log('products loaded:', response);
      },
      error: (error) => {
        console.error('not good at all', error);
      }
    });
  }
}