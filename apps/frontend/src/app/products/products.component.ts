import { Component, OnInit } from '@angular/core';
import { Role } from '@common/Enums';
import { GetProductsListRequest, GetProductsListResponse, ProductFull } from '@common/Interfaces';
import { map, Observable, Subscription, tap } from 'rxjs';
import { AuthSession } from '../auth/auth-session.interface';
import { SessionService } from '../auth/services/Session.service';
import { productListOptionsEnum } from './product-list/product-list-options-enum';
import { ProductsHttpService } from './services/products-http.service';
@Component({
    selector: 'app-products',
    standalone: false,
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
    constructor(
        private productService: ProductsHttpService,
        private sessionService: SessionService
    ) {}
    productsResponse?: GetProductsListResponse;
    productListOptionsEnum = productListOptionsEnum; //expose the enum to the html

    productListMode = productListOptionsEnum.PublicView;

    private userSub!: Subscription;

    ngOnInit(): void {
        this.userSub = this.sessionService.sessionObservable$.subscribe((session: AuthSession | null) => {
            if (session?.role === Role.Client) {
                this.productListMode = productListOptionsEnum.CustomerView;
            }
            if (session?.role === Role.Admin) {
                this.productListMode = productListOptionsEnum.AdminView;
            }
        });
    }

    fetchProducts = (page: number, limit: number, keyword: string): Observable<ProductFull[]> => {
        const query: GetProductsListRequest = { page, limit, keyword };

        return this.productService.getProducts(query).pipe(
            tap((res) => (this.productsResponse = res)),
            map((res) => res.products)
        );
    };
}
