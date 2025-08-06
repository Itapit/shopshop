import { Component, signal } from '@angular/core';
import { UiStateService } from '../../shared/ui-state.service';

@Component({
    selector: 'app-cart-link',
    standalone: false,
    templateUrl: './cart-link.component.html',
    styleUrl: './cart-link.component.css',
})
export class CartLinkComponent {
    buttonText = signal('Cart');
    constructor(private uiStateService: UiStateService) {}

    clickCart() {
        this.uiStateService.triggerCart();
    }
}
