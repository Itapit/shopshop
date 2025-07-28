import { Component, OnInit } from "@angular/core";
import { productListOptionsEnum } from "./product-list/product-list-options-enum";
import { ProductsHttpService } from "./services/products-http.service";
import { GetProductsListRequestDTO, GetProductsListResponseDTO } from "@common/DTOs";
import { PaginatorState } from "primeng/paginator";

@Component({
    selector: "app-products",
    standalone: false,
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  productsResponse?: GetProductsListResponseDTO;
  totalRecords = 0;
  page = 0;
  limit = 10;

  constructor(private productService: ProductsHttpService) {}
  productListOptionsEnum = productListOptionsEnum; //expose the enum to the html

  ngOnInit(): void {
    this.loadProducts();
  }
  
  loadProducts(event?: PaginatorState) {
    const page = event?.page ?? 0;
    const limit = event?.rows ?? this.limit;
  
    this.page = page;
    this.limit = limit;
  
    const query: GetProductsListRequestDTO = {
      page: this.page+1,  // start the page from 1
      limit,
    };
  
    this.productService.getProducts(query).subscribe({
      next: (res) => {
        this.productsResponse = res;
        this.totalRecords = res.totalCount;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }
}
