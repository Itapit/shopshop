import { createSelector } from '@ngrx/store';
import { cartFeature } from './cart.reducer';

export const selectCartState = cartFeature.selectCartState;
export const selectItems = cartFeature.selectItems;
export const selectTotal = cartFeature.selectTotal; 
export const selectLoading = cartFeature.selectLoading;
export const selectError = cartFeature.selectError;

export const selectItemIds = createSelector(selectItems, (items) => items.map((i) => i.productID));

export const selectCount = createSelector(selectItems, (items) => items.reduce((sum, i) => sum + (i.quantity ?? 0), 0));

export const selectSubtotal = createSelector(selectItems, (items) =>
    items.reduce((sum, i) => sum + (i.price ?? 0) * (i.quantity ?? 0), 0)
);
