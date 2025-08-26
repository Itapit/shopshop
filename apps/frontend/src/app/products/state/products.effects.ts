import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ProductsHttpService } from "../services/products-http.service";
import { catchError,  map, mergeMap, of} from "rxjs";
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "./products.actions";

@Injectable()
export class ProductsEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private productsApi = inject(ProductsHttpService);

    
    
    loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(({ page, limit, keyword }) =>
        this.productsApi.getProducts({page, limit, keyword}).pipe(
          map(products => loadProductsSuccess({ products })),
          catchError(error => of(loadProductsFailure({ error })))
        )
      )
    )
  );
}