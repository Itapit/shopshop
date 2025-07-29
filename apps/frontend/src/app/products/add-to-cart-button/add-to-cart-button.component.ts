import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-add-to-cart-button',
  standalone: false,
  templateUrl: "./add-to-cart-button.component.html",
  styleUrls:["./add-to-cart-button.component.css"],
})
export class AddToCartButtonComponent {
    @Input() initialQuantity = 0;
    @Input() maxQuantity = 0;
    @Output() quantityChange = new EventEmitter<number>();
    
    isLoading = false;
    quantity = 0;
    
    ngOnInit() {
      this.quantity = this.initialQuantity;
    }
    
    addToCart() {
      this.isLoading = true;
    
      setTimeout(() => {
        this.quantity = 1;
        this.quantityChange.emit(1);
        this.isLoading = false;
      }, 400);
    }
    onQuantityChange(newQty: number | string) {
        const parsed = typeof newQty === 'string' ? parseInt(newQty) : newQty;
        this.quantity = parsed > 0 ? parsed : 0;
        this.quantityChange.emit(this.quantity);
    }
}
