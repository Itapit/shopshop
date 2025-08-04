import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-cart-link',
  standalone: false,
  templateUrl: './cart-link.component.html',
  styleUrl: './cart-link.component.css'
})
export class CartLinkComponent {
    buttonText = signal('Cart');
}
