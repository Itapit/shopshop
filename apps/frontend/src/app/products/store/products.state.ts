import { ProductFull } from '@common/Interfaces';

export const productsFeatureKey = 'products';

export interface ProductsState {
    items: ProductFull[];
    loading: boolean;
    error: unknown | null;

    // store the query params in state
    totalCount: number | null;
    totalPages: number | null;
    page: number;
    limit: number | undefined;
    keyword: string | undefined;
}

export const initialProductsState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    totalCount: null,
    totalPages: null,
    page: 1,
    limit: 10,
    keyword: undefined,
};
