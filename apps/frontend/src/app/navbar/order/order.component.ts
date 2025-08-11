import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectItems } from '../../cart/state/cart.selectors';
import { placeOrder } from '../../order/state/order.actions';
import { selectOrderSaving } from '../../order/state/order.selectors';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-order-link',
    standalone: false,
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
})
export class OrderComponent {
    private store = inject(Store);
    private msgService = inject(MessageService);

    saving$ = this.store.select(selectOrderSaving);
    items$ = this.store.select(selectItems);

    async clickOrder() {
        const items = await firstValueFrom(this.items$);
        if (!items || items.length === 0) {
            this.msgService.add({
                severity: 'warn',
                summary: 'No items in cart',
                detail: 'Please add items to your cart before placing an order.',
            });
            return;
        }
        this.store.dispatch(placeOrder());
    }
}
