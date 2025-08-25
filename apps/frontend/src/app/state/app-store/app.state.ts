import { RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';
import { AuthState } from '../../auth/store/auth.state';
import { CartState } from '../../cart/state/cart.state';
import { OrderState } from '../../order/state/order.state';

export interface AppState {
    router: RouterReducerState<SerializedRouterStateSnapshot>;
    auth: AuthState;
    cart: CartState;
    order: OrderState;
}

export const initialAppState: Partial<AppState> = {};
