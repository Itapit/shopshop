import { createFeature, createReducer, on } from '@ngrx/store';
import { placeOrder, placeOrderSuccess, placeOrderFailure } from './order.actions';
import { initialOrderState, OrderState, orderFeatureKey } from './order.state';

const reducer = createReducer<OrderState>(
  initialOrderState,

  on(placeOrder, s => ({ ...s, saving: true, error: null })),

  on(placeOrderSuccess, (s) => ({
    ...s,
    saving: false,
    error: null, 
   
  })),

  on(placeOrderFailure, (s, { error }) => ({
    ...s,
    saving: false,
    error: String(error),
  })),
);

export const orderFeature = createFeature({
  name: orderFeatureKey,
  reducer,
});
