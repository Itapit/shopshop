import { Component, Input, OnInit } from "@angular/core";
import { productListOptionsEnum } from "./product-list-options-enum";
import { ProductDto } from "@common/DTOs";
import { Observable } from "rxjs";
import { PaginatorState } from "primeng/paginator";
@Component({
  selector: "app-product-list",
    standalone: false,
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  @Input() mode!: productListOptionsEnum ; // 'view' or 'cart'
  @Input() fetchFunction!: (page: number, limit: number) => Observable<ProductDto[]>;
  @Input() totalRecords!: number;

  productListOptionsEnum = productListOptionsEnum; //expose the enum to the html

  products: ProductDto[] = [];
  page = 1;
  limit = 10;
  
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(event?: PaginatorState) {
    const page = (event?.page ?? 0) + 1;
    const limit = event?.rows ?? this.limit;

    this.page = page;
    this.limit = limit;

    this.fetchFunction(page, limit).subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.error('Error in fetchFunction:', err);
      },
    });
  }
}