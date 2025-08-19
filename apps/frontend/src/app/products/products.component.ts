import { Component, inject } from '@angular/core';
import { Role } from '@common/Enums';
import { GetProductsListRequest, GetProductsListResponse, ProductFull } from '@common/Interfaces';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { selectRole } from '../auth/store/auth.selectors';
import { AuthState } from '../auth/store/auth.state';
import { productListOptionsEnum } from './product-list/product-list-options.enum';
import { ProductsHttpService } from './services/products-http.service';

@Component({
    selector: 'app-products',
    standalone: false,
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
    private readonly store = inject<Store<{ auth: AuthState }>>(Store);
    constructor(private productService: ProductsHttpService) {}

    productsResponse?: GetProductsListResponse;
    productListOptionsEnum = productListOptionsEnum; //expose the enum to the html

    productListMode$: Observable<productListOptionsEnum> = this.store
        .select(selectRole)
        .pipe(
            map((role) =>
                role === Role.Admin
                    ? productListOptionsEnum.AdminView
                    : role === Role.Client
                      ? productListOptionsEnum.CustomerView
                      : productListOptionsEnum.PublicView
            )
        );

    fetchProducts = (page: number, limit: number, keyword: string): Observable<ProductFull[]> => {
        const query: GetProductsListRequest = { page, limit, keyword };

        return this.productService.getProducts(query).pipe(
            tap((res) => (this.productsResponse = res)),
            map((res) => res.products)
        );
    };
}
