import { Component } from '@angular/core';
import { UiStateService } from '../../shared/ui-state.service';

@Component({
    selector: 'app-order-link',
    standalone: false,
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
})
export class OrderComponent {
    constructor(private uiStateService: UiStateService) {}

    clickOrder() {
        this.uiStateService.triggerOrder();
    }
}
