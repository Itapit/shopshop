import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CartService } from '../services/cart.service';
import {
    loadCart,
    loadCartFailure,
    loadCartSuccess,
    loadTotal,
    loadTotalFailure,
    loadTotalSuccess,
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
}
