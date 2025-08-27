import { Component, inject } from '@angular/core';
import { Role } from '@common/Enums';
import { GetProductsListResponse, ProductFull } from '@common/Interfaces';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectRole } from '../auth/store/auth.selectors';
import { AuthState } from '../auth/store/auth.state';
import { productListOptionsEnum } from './product-list/product-list-options.enum';
import { ProductsHttpService } from './services/products-http.service';
import { loadProducts } from './state/products.actions';
import { selectProductsLoading, selectProductsState } from './state/products.selectors';
import { ProductsState } from './state/products.state';

@Component({
    selector: 'app-products',
    standalone: false,
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
    private readonly store = inject<Store<{ auth: AuthState; products: ProductsState }>>(Store);
    constructor(private productService: ProductsHttpService) {}

    products$!: Observable<ProductFull[]>;

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

    // readonly MIN_LOADER_MS = 300; // tweak: 250–400 feels great

    loading$ = this.store.select(selectProductsLoading);

    // loadingUi$ = this.loading$.pipe(
    //     // Show immediately when true; when false, wait MIN_LOADER_MS before hiding
    //     switchMap((isLoading) => (isLoading ? of(true) : timer(this.MIN_LOADER_MS).pipe(map(() => false)))),
    //     distinctUntilChanged(),
    //     shareReplay({ bufferSize: 1, refCount: true })
    // );

    ngOnInit() {
        this.products$ = this.store.select(selectProductsState).pipe(map((state) => state.items));

        this.store.dispatch(loadProducts({ page: 1, limit: 14, keyword: '' }));
    }

    fetchProducts = (page: number, limit: number, keyword: string): Observable<ProductFull[]> => {
        this.store.dispatch(loadProducts({ page, limit, keyword }));
        return this.products$;
    };
}
