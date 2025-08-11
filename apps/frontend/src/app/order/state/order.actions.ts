import { CreateOrderResponse } from '@common/Interfaces';
import { createAction, props } from '@ngrx/store';

export const placeOrder = createAction('[Order/API] Place Order');

export const placeOrderSuccess = createAction(
    '[Order/API] Place Order Success',
    props<{ order: CreateOrderResponse }>()
);

export const placeOrderFailure = createAction('[Order/API] Place Order Failure', props<{ error: unknown }>());
