// order.state/order.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { withLatestFrom, map, switchMap, catchError, of } from 'rxjs';
import { placeOrder, placeOrderSuccess, placeOrderFailure } from './order.actions';
import { selectItems } from '../../cart/state/cart.selectors';
import { OrderService } from '../services/order.service';
import { clearCart, loadTotal } from '../../cart/state/cart.actions';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private store: Store, private orders: OrderService) {}

  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(placeOrder),
      withLatestFrom(this.store.select(selectItems)),
      map(([, items]) => items.map(i => ({ productID: i.productID, quantity: i.quantity }))),
      switchMap((payload) =>
        this.orders.placeOrder(payload).pipe(
          map((res) => placeOrderSuccess({ order: res })),
          catchError((error) => of(placeOrderFailure({ error })))
        )
      )
    )
  );

  
  afterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(placeOrderSuccess),
      map(() => clearCart())
    )
  );

  afterClearRefreshTotal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(placeOrderSuccess),
      map(() => loadTotal())
    )
  );
}
