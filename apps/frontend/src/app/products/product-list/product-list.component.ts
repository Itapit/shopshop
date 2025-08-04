import { Component, Input, OnInit } from "@angular/core";
import { productListOptionsEnum } from "./product-list-options-enum";
import { Observable } from "rxjs";
import { PaginatorState } from "primeng/paginator";
import { ProductFull } from "@common/Interfaces";
import { SharedService } from "../../shared/shared.service";
@Component({
  selector: "app-product-list",
    standalone: false,
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  @Input() mode!: productListOptionsEnum ; // 'view' or 'cart'
  @Input() fetchFunction!: (page: number, limit: number , keyword:string ) => Observable<ProductFull[]>;
  @Input() totalRecords!: number;
  keyword:string = ''
  constructor(private sharedService: SharedService){}
  productListOptionsEnum = productListOptionsEnum; //expose the enum to the html

  products: ProductFull[] = [];
  page = 1;
  limit = 12;
  
  
  ngOnInit() {
      this.sharedService.searchClicked$.subscribe((value) => {
      this.handleSearch(value);
    })
    this.loadProducts();
  } 
  async handleSearch(value:string){
     this.keyword = value;
     this.loadProducts()
  }

  loadProducts(event?: PaginatorState) {
    const page = (event?.page ?? 0) + 1;
    const limit = event?.rows ?? this.limit;

    this.page = page;
    this.limit = limit;

    this.fetchFunction(page, limit , this.keyword ).subscribe({
      next: (res) => {
        this.products = res;
        this.totalRecords = this.products.length;
      },
      error: (err) => {
        console.error('Error in fetchFunction:', err);
      },
    });
  }
}