import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductsHttpService } from '../services/products-http.service';
import { loadProducts, loadProductsFailure, loadProductsSuccess } from './products.actions';

@Injectable()
export class ProductsEffects {
    private actions$ = inject(Actions);
    private productsApi = inject(ProductsHttpService);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProducts),
            mergeMap(({ productsListRequest }) =>
                this.productsApi.getProducts(productsListRequest).pipe(
                    map((productsListResponse) => loadProductsSuccess({ productsListResponse })),
                    catchError((error) => of(loadProductsFailure({ error })))
                )
            )
        )
    );
}
