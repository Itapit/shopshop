import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap } from 'rxjs';
import { CartService } from '../services/cart.service';
import {
    clearCart,
    clearCartFailure,
    clearCartSuccess,
    loadCart,
    loadCartFailure,
    loadCartSuccess,
    loadTotal,
    loadTotalFailure,
    loadTotalSuccess,
    removeItem,
    removeItemFailure,
    removeItemSuccess,
} from './cart.actions';

@Injectable()
export class CartEffects {
    private actions$ = inject(Actions);
    private api = inject(CartService);

    loadCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCart),
            mergeMap(() =>
                this.api.getCart().pipe(
                    map((res) => loadCartSuccess({ items: res.items })),
                    catchError((error) => of(loadCartFailure({ error })))
                )
            )
        )
    );

    loadTotal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTotal),
            mergeMap(() =>
                this.api.getCartPrice().pipe(
                    map((res) => loadTotalSuccess({ total: res.total })),
                    catchError((error) => of(loadTotalFailure({ error })))
                )
            )
        )
    );

    removeItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeItem),
            concatMap(({ productID }) =>
                this.api.updateCartItemQuantity({ productID, quantity: 0 }).pipe(
                    map(() => removeItemSuccess({ productID })),
                    catchError((error) => of(removeItemFailure({ productID, error })))
                )
            )
        )
    );

    reloadCartAfterRemove$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeItemSuccess),
            map(() => loadCart())
        )
    );

    reloadTotalAfterRemove$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeItemSuccess),
            map(() => loadTotal())
        )
    );

    clearCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(clearCart),
            switchMap(() =>
                this.api.deleteCart().pipe(
                    map(() => clearCartSuccess()),
                    catchError((error) => of(clearCartFailure({ error })))
                )
            )
        )
    );

   
    afterClearReload$ = createEffect(() =>
        this.actions$.pipe(
            ofType(clearCartSuccess),
            mergeMap(() => of(loadCart(), loadTotal()))
        )
    );
}
