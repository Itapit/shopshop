import { Component, inject } from '@angular/core';
import { UiStateService } from '../../shared/ui-state.service';
import { Store } from '@ngrx/store';
import { selectOrderSaving } from '../../order/state/order.selectors';
import { placeOrder } from '../../order/state/order.actions';

@Component({
    selector: 'app-order-link',
    standalone: false,
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
})
export class OrderComponent {
    private store = inject(Store);
    
    
    saving$ = this.store.select(selectOrderSaving);

    clickOrder() { 
        this.store.dispatch(placeOrder());
        
    }
}
