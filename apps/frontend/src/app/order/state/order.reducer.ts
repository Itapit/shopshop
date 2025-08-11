import { createFeature, createReducer, on } from '@ngrx/store';
import { placeOrder, placeOrderFailure, placeOrderSuccess } from './order.actions';
import { initialOrderState, orderFeatureKey, OrderState } from './order.state';

const reducer = createReducer<OrderState>(
    initialOrderState,

    on(placeOrder, (s) => ({ ...s, saving: true, error: null })),

    on(placeOrderSuccess, (s) => ({
        ...s,
        saving: false,
        error: null,
    })),

    on(placeOrderFailure, (s, { error }) => ({
        ...s,
        saving: false,
        error: String(error),
    }))
);

export const orderFeature = createFeature({
    name: orderFeatureKey,
    reducer,
});
