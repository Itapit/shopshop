import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductFull } from '@common/Interfaces';
import { PaginatorState } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { productListOptionsEnum } from './product-list-options.enum';

@Component({
    selector: 'app-product-list',
    standalone: false,
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
    @Input() mode!: productListOptionsEnum; // 'view' or 'cart'
    @Input() fetchFunction!: (page: number, limit: number, keyword: string) => Observable<ProductFull[]>;
    @Input() loading: boolean = false;
    @Input() totalRecords!: number;
    @Output() removeClicked = new EventEmitter<string>();

    productListOptionsEnum = productListOptionsEnum; //expose the enum to the html

    products: ProductFull[] = [];
    keyword = '';
    page = 1;
    limit = 14;

    skeletonItems = Array.from({ length: 50 });

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts(event?: PaginatorState) {
        const page = (event?.page ?? 0) + 1;
        const limit = event?.rows ?? this.limit;

        this.page = page;
        this.limit = limit;

        this.fetchFunction(page, limit, this.keyword).subscribe({
            next: (res) => {
                this.products = res;
            },
            error: (err) => {
                console.error('Error in fetchFunction:', err);
            },
        });
    }
}
