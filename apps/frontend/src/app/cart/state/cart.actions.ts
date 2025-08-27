import { ProductFull } from '@common/Interfaces';
import { createAction, props } from '@ngrx/store';

export const loadCart = createAction('[Cart/API] Load Cart');
export const loadCartSuccess = createAction('[Cart/API] Load Cart Success', props<{ items: ProductFull[] }>());
export const loadCartFailure = createAction('[Cart/API] Load Cart Failure', props<{ error: unknown }>());

export const loadTotal = createAction('[Cart/API] Load Total');
export const loadTotalSuccess = createAction('[Cart/API] Load Total Success', props<{ total: number }>());
export const loadTotalFailure = createAction('[Cart/API] Load Total Failure', props<{ error: unknown }>());

export const removeItem = createAction('[Cart/API] Remove Item', props<{ productID: string }>());
export const removeItemSuccess = createAction('[Cart/API] Remove Item Success', props<{ productID: string }>());
export const removeItemFailure = createAction(
    '[Cart/API] Remove Item Failure',
    props<{ productID: string; error: unknown }>()
);

export const clearCart = createAction('[Cart/API] Clear Cart');
export const clearCartSuccess = createAction('[Cart/API] Clear Cart Success');
export const clearCartFailure = createAction('[Cart/API] Clear Cart Failure', props<{ error: unknown }>());
