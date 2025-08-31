import { Component, inject } from '@angular/core';
import { Role } from '@common/Enums';
import { GetProductsListRequest, ProductFull } from '@common/Interfaces';
import { map, Observable } from 'rxjs';
import { AuthFacade } from '../auth/store/auth.facade';
import { productListOptionsEnum } from './product-list/product-list-options.enum';
import { ProductsFacade } from './store/products.facade';

@Component({
    selector: 'app-products',
    standalone: false,
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
    private productsFacade = inject(ProductsFacade);
    private authFacade = inject(AuthFacade);

    products$ = this.productsFacade.products$;
    loading$ = this.productsFacade.loading$;
    totalProductsCount$ = this.productsFacade.totalProductsCount$;

    productListOptionsEnum = productListOptionsEnum; //expose the enum to the html

    productListMode$ = this.authFacade.role$.pipe(
        map((role) =>
            role === Role.Admin
                ? productListOptionsEnum.AdminView
                : role === Role.Client
                  ? productListOptionsEnum.CustomerView
                  : productListOptionsEnum.PublicView
        )
    );

    fetchProducts = (page: number, limit: number, keyword: string): Observable<ProductFull[]> => {
        const payload: GetProductsListRequest = { page, limit, keyword };
        this.productsFacade.loadProductsFacade(payload);
        return this.products$;
    };
}
