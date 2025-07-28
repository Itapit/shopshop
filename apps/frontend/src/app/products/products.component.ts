import { Component, OnInit } from "@angular/core";
import { productListOptionsEnum } from "./product-list/product-list-options-enum";
import { ProductsHttpService } from "./services/products-http.service";
import { GetProductsListResponseDTO, ProductDto } from "@common/DTOs";
import { map, Observable, tap } from "rxjs";

@Component({
    selector: "app-products",
    standalone: false,
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  productsResponse?: GetProductsListResponseDTO;
  totalRecords = 0;
  page = 0;
  limit = 10;

  constructor(private productService: ProductsHttpService) {}
  productListOptionsEnum = productListOptionsEnum; //expose the enum to the html

  fetchProducts = (page: number, limit: number): Observable<ProductDto[]> => {
    return this.productService.getProducts({ page, limit }).pipe(
      tap((res) => this.productsResponse = res),
      map((res) => res.data)
    );
  };

}
