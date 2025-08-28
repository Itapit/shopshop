import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-add-product',
    standalone: false,
    templateUrl: './add-product.component.html',
    styleUrl: './add-product.component.css',
})
export class AddProductComponent {
    addProduct() {
        console.log('Add Product clicked');
    }
    buttonText = signal('Add Product');
}
