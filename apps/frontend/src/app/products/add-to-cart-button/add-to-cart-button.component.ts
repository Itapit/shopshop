import { Component, EventEmitter, Host, Input, Output } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CartService } from '../../cart/services/cart.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductItem } from '@common/Interfaces';


@Component({
  selector: 'app-add-to-cart-button',
  standalone: false,
  templateUrl: "./add-to-cart-button.component.html",
  styleUrls:["./add-to-cart-button.component.css"],
})
export class AddToCartButtonComponent {
    @Input() initialQuantity = 0;
    @Input() maxQuantity = 0;
    @Input() product_id!:string;
    @Output() quantityChange = new EventEmitter<number>();


    constructor(  private cartService : CartService){}
    
    isLoading = false;
    quantity = 0;
    
    ngOnInit() {
      
      this.quantity = this.initialQuantity;
    }
    
    addToCart() {
      this.isLoading = true;
    
      setTimeout(() => {
        this.quantity = 1;
        const item : ProductItem = {productID: this.product_id , quantity: this.quantity};
        this.cartService.updateCartItemQuantity(item);
        this.quantityChange.emit(1);
        this.isLoading = false;
      }, 400);
    }
    onQuantityChange(newQty: number | string) {
        const parsed = typeof newQty === 'string' ? parseInt(newQty) : newQty;
        this.quantity = parsed > 0 ? parsed : 0;
        this.quantityChange.emit(this.quantity);
        
        const item : ProductItem = {productID: this.product_id , quantity: this.quantity};
        
        this.cartService.updateCartItemQuantity(item);
        

    }
    
}
