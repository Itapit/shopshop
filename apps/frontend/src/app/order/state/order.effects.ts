// order.state/order.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { clearCart } from '../../cart/state/cart.actions';
import { selectItems } from '../../cart/state/cart.selectors';
import { OrderService } from '../services/order.service';
import { placeOrder, placeOrderFailure, placeOrderSuccess } from './order.actions';

@Injectable()
export class OrderEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private orders = inject(OrderService);
    private messageService = inject(MessageService);

    placeOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(placeOrder),
            withLatestFrom(this.store.select(selectItems)),
            map(([, items]) => items.map((i) => ({ productID: i.productID, quantity: i.quantity }))),
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
    toastOnOrderSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(placeOrderSuccess),
                tap(() =>
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Order Placed',
                    })
                )
            ),
        { dispatch: false } // important!
    );
}
