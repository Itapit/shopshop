import { RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';
import { AuthState } from '../../auth/store/auth.state';
import { CartState } from '../../cart/state/cart.state';
import { OrderState } from '../../order/state/order.state';
import { ProductsState } from '../../products/state/products.state';

export interface AppState {
    router: RouterReducerState<SerializedRouterStateSnapshot>;
    auth: AuthState;
    cart: CartState;
    order: OrderState;
    products: ProductsState;
}

export const initialAppState: Partial<AppState> = {};
