import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectItems } from '../../cart/state/cart.selectors';
import { placeOrder } from '../../order/state/order.actions';
import { selectOrderSaving } from '../../order/state/order.selectors';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-order-link',
    standalone: false,
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
})
export class OrderComponent {
    private store = inject(Store);

    saving$ = this.store.select(selectOrderSaving);
    items$ = this.store.select(selectItems);

    async clickOrder() {
        const items = await firstValueFrom(this.items$);
        if (!items || items.length === 0)
             return;
        this.store.dispatch(placeOrder());
    }
}
