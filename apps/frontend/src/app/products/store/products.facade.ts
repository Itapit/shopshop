import { inject, Injectable } from '@angular/core';
import { GetProductsListRequest } from '@common/Interfaces';
import { Store } from '@ngrx/store';
import { combineLatest, firstValueFrom } from 'rxjs';
import { loadProducts } from './products.actions';
import {
    selectError,
    selectItems,
    selectKeyword,
    selectLimit,
    selectLoading,
    selectPage,
    selectTotalCount,
    selectTotalPages,
} from './products.selectors';
import { ProductsState } from './products.state';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
    private store = inject<Store<{ products: ProductsState }>>(Store);

    loading$ = this.store.select(selectLoading);
    error$ = this.store.select(selectError);
    products$ = this.store.select(selectItems);
    currentPage$ = this.store.select(selectPage);
    totalPages$ = this.store.select(selectTotalPages);
    totalProductsCount$ = this.store.select(selectTotalCount);
    limit$ = this.store.select(selectLimit);
    keyword$ = this.store.select(selectKeyword);

    loadProductsFacade(payload: GetProductsListRequest) {
        this.store.dispatch(loadProducts({ productsListRequest: payload }));
    }

    async search(keyword: string | undefined) {
        const [page, limit, currentKeyword] = await firstValueFrom(
            combineLatest([this.currentPage$, this.limit$, this.keyword$])
        );

        const nextKeyword = (keyword ?? '').trim(); // '' means “no filter”
        const isSameKeyword = nextKeyword === (currentKeyword ?? '');

        this.loadProductsFacade({
            page: isSameKeyword ? page : 1,
            limit,
            keyword: nextKeyword,
        });
    }
}
