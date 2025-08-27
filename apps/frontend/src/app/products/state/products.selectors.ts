import { productsFeature } from './products.reducer';
export const selectProductsState = productsFeature.selectProductsState;
export const selectProductsLoading = productsFeature.selectLoading;
export const selectProductsError = productsFeature.selectError;
