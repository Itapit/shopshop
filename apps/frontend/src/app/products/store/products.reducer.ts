import { createFeature, createReducer, on } from '@ngrx/store';
import { loadProducts, loadProductsFailure, loadProductsSuccess } from './products.actions';
import { initialProductsState, productsFeatureKey, ProductsState } from './products.state';

const productsReducer = createReducer<ProductsState>(
    initialProductsState,

    on(loadProducts, (state, { productsListRequest }) => ({
        ...state,
        loading: true,
        error: null,
        page: productsListRequest.page,
        limit: productsListRequest.limit,
        keyword: '',
    })),

    on(loadProductsSuccess, (state, { productsListResponse }) => ({
        ...state,
        loading: false,
        items: productsListResponse.products,
        totalCount: productsListResponse.totalCount,
        totalPages: productsListResponse.totalPages,
        page: productsListResponse.page,
        limit: productsListResponse.limit,
    })),

    on(loadProductsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const productsFeature = createFeature({
    name: productsFeatureKey,
    reducer: productsReducer,
});
