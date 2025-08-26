import { GetProductsListResponse } from "@common/Interfaces";
import { createAction, props } from "@ngrx/store";

export const loadProducts = createAction('[Products/API] Load products' , props<{ page: number; limit: number; keyword?: string }>());

export const loadProductsSuccess = createAction(
    '[Products/API] Load products Success',
    props<{ products: GetProductsListResponse }>()
);

export const loadProductsFailure = createAction('[Products/API] Load products Failure', props<{ error: unknown }>());
