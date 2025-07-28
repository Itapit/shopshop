import { Component, OnInit } from "@angular/core";
import { productListOptionsEnum } from "./product-list/product-list-options-enum";
import { ProductsHttpService } from "./services/products-http.service";
import { GetProductsListRequestDTO, GetProductsListResponseDTO, ProductDto } from "@common/DTOs";
import { map, Observable, tap } from "rxjs";
import { TokenService } from "../auth/services/token.service";
import { Role } from "@common/Enums"
@Component({
    selector: "app-products",
    standalone: false,
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit{
  constructor(private productService: ProductsHttpService, private tokenService: TokenService) {}
  productsResponse?: GetProductsListResponseDTO;
  productListOptionsEnum = productListOptionsEnum; //expose the enum to the html

  productListMode= productListOptionsEnum.LoggedOut

  ngOnInit(): void {
    if(this.tokenService.getRole() == Role.Client) {
      this.productListMode = productListOptionsEnum.LoggedIn
    }
  }

  fetchProducts = (page: number, limit: number): Observable<ProductDto[]> => {
    const query: GetProductsListRequestDTO = { page, limit };
    
    return this.productService.getProducts(query).pipe(
      tap((res) => this.productsResponse = res),
      map((res) => res.data)
    );
  };
}
