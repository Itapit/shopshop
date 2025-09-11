import { GetProductsListRequest, GetProductsListResponse } from '@common/Interfaces';
import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction(
    '[Products/API] Load products',
    props<{ productsListRequest: GetProductsListRequest }>()
);

export const loadProductsSuccess = createAction(
    '[Products/API] Load products Success',
    props<{ productsListResponse: GetProductsListResponse }>()
);

export const loadProductsFailure = createAction('[Products/API] Load products Failure', props<{ error: unknown }>());
