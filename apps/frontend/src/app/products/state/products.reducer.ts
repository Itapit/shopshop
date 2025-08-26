import { createFeature, createReducer, on } from "@ngrx/store";
import { initialProductsState, productsFeatureKey, ProductsState } from "./products.state";
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "./products.actions";

const reducer = createReducer<ProductsState>(
    initialProductsState,

    on(loadProducts, (state, { page, limit, keyword }) => ({
    ...state,
    loading: true,
    error: null,
    page,
    limit,
    keyword,
  })),

  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    items: products.products,
  })),

  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const productsFeature = createFeature({
    name: productsFeatureKey,
    reducer,
});
