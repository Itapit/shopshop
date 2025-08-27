import { Component, signal } from '@angular/core';
import { NavigationService } from '../../shared/navigation.service';

@Component({
    selector: 'app-cart-link',
    standalone: false,
    templateUrl: './cart-link.component.html',
    styleUrl: './cart-link.component.css',
})
export class CartLinkComponent {
    constructor(private nav: NavigationService) {}

    toCart(): void {
        this.nav.toCart();
    }
    buttonText = signal('Cart');
}
