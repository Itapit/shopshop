import { productsFeature } from './products.reducer';

export const {
    selectError,
    selectItems,
    selectKeyword,
    selectLimit,
    selectLoading,
    selectPage,
    selectTotalCount,
    selectTotalPages,
} = productsFeature;

export const selectProductsState = productsFeature.selectProductsState;
