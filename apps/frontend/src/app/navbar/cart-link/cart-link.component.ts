import { Component, signal } from '@angular/core';
import { SharedService } from '../../shared/ui-state.service';

@Component({
    selector: 'app-cart-link',
    standalone: false,
    templateUrl: './cart-link.component.html',
    styleUrl: './cart-link.component.css',
})
export class CartLinkComponent {
    buttonText = signal('Cart');
    constructor(private sharedService: SharedService) {}

    clickCart() {
        this.sharedService.triggerCart();
    }
}
