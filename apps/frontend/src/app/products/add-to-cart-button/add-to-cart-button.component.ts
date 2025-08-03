import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductBase } from '@common/Interfaces';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: false,
  templateUrl: "./add-to-cart-button.component.html",
  styleUrls:["./add-to-cart-button.component.css"],
})
export class AddToCartButtonComponent {
  @Input() product!:ProductBase;
  @Input() initialQuantity = 0;
  @Output() quantityChange = new EventEmitter<number>();

  constructor(private msgService: MessageService) {}

  isLoading = false;
  quantity = 0;
  private previousQuantity = 0;
  
  ngOnInit() {
    this.quantity = this.initialQuantity;
    this.previousQuantity = this.initialQuantity;
  }
  
  addToCart() {
    this.quantity = 1;
    this.previousQuantity = 0;
    this.msgService.add({severity:"success", summary:"Added to cart", detail:`Added ${this.quantity} x ${this.product.name} to the cart`});

    this.isLoading = true;
  
    setTimeout(() => {
      this.quantityChange.emit(1);
      this.isLoading = false;
    }, 400);
  }

  onQuantityChange(newQty: number | string) {
    const parsed = typeof newQty === "string" ? parseInt(newQty) : newQty;
    let newQuantity = parsed > 0 ? parsed : 0;
    
    if (newQuantity > this.product.quantity) {
      newQuantity = this.product.quantity;
    }
    if (newQuantity === 0) {
      this.msgService.add({
        severity: "info",
        summary: "Removed from cart",
        detail: `Removed ${this.product.name} from the cart`,
      });
    } else if (newQuantity > this.previousQuantity) {
      this.msgService.add({
        severity: "success",
        summary: "Updated cart",
        detail: `Updated quantity to ${newQuantity} x ${this.product.name}`,
      });
    } else if (newQuantity < this.previousQuantity) {
      this.msgService.add({
        severity: "warn",
        summary: "Reduced quantity",
        detail: `Reduced quantity to ${newQuantity} x ${this.product.name}`,
      });
    }

    this.quantity = newQuantity;
    this.previousQuantity = newQuantity;
    this.quantityChange.emit(this.quantity);
  }
}

