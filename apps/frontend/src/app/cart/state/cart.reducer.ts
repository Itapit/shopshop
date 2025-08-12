import { createFeature, createReducer, on } from '@ngrx/store';
import {
    clearCart,
    clearCartFailure,
    clearCartSuccess,
    loadCart,
    loadCartFailure,
    loadCartSuccess,
    loadTotal,
    loadTotalFailure,
    loadTotalSuccess,
    removeItem,
    removeItemFailure,
    removeItemSuccess,
} from './cart.actions';
import { cartFeatureKey, CartState, initialCartState } from './cart.state';

const reducer = createReducer<CartState>(
    initialCartState,
    on(loadCart, (s) => ({ ...s, loading: true, error: null })),
    on(loadCartSuccess, (s, { items }) => ({ ...s, loading: false, items })),
    on(loadCartFailure, (s, { error }) => ({ ...s, loading: false, error: String(error) })),

    on(loadTotal, (s) => ({ ...s, loading: true, error: null })),
    on(loadTotalSuccess, (s, { total }) => ({ ...s, loading: false, total })),
    on(loadTotalFailure, (s, { error }) => ({ ...s, loading: false, error: String(error) })),

    on(removeItem, (s) => ({ ...s, loading: true, error: null })),
    on(removeItemSuccess, (s, { productID }) => ({ ...s, loading: false })),
    on(removeItemFailure, (s, { error }) => ({ ...s, loading: false, error: String(error) })),

    on(clearCart, (s) => ({ ...s, loading: true, error: null })),
    on(clearCartSuccess, (s) => ({ ...s, loading: false, items: [], total: 0 })),
    on(clearCartFailure, (s, { error }) => ({ ...s, loading: false, error: String(error) }))
);

export const cartFeature = createFeature({
    name: cartFeatureKey,
    reducer,
});

