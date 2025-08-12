import { ProductFull } from '@common/Interfaces';

export const cartFeatureKey = 'cart';

export interface CartState {
    items: ProductFull[];
    total: number | null;
    loading: boolean;
    error: string | null;
}

export const initialCartState: CartState = {
    items: [],
    total: null,
    loading: false,
    error: null,
};
