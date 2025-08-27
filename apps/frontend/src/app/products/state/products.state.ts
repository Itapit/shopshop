import { ProductFull } from "@common/Interfaces";

export const productsFeatureKey = 'products';

export interface ProductsState {
  items: ProductFull[];
  loading: boolean;
  error: unknown | null;

  // store the query params in state
  page: number;
  limit: number;
  keyword: string | undefined;
}

export const initialProductsState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  keyword: undefined,
};