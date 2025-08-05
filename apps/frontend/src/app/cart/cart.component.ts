import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProductFull, ProductItem } from '@common/Interfaces';
import { MessageService } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { OrderService } from '../order/services/order.service';
import { productListOptionsEnum } from '../products/product-list/product-list-options-enum';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { SharedService } from '../shared/shared.service';
import { CartService } from './services/cart.service';

@Component({
    selector: 'app-cart',
    standalone: false,
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class CartComponent {
    @ViewChild(ProductListComponent)
    productListComponent!: ProductListComponent;

    products: ProductFull[] = [];
    productListOptionsEnum = productListOptionsEnum;

    constructor(
        private msgService: MessageService,
        private sharedService: SharedService,
        private cartService: CartService,
        private router: Router,
        private orderService: OrderService
    ) {}
    totalPrice: number = 0;
    totalRecords: number = 0;

    ngOnInit() {
        this.sharedService.orderClicked$.subscribe(() => {
            this.handleOrder();
        });

        this.cartService.getCart().subscribe({
            next: (res) => {
                console.log('success', res.items);
                this.products = res.items;
                this.totalRecords = this.products.length;
            },
            error: (err) => {
                console.error('failed', err);
            },
        });

        this.cartService.getCartPrice().subscribe({
            next: (res) => {
                console.log('success price', res);
                this.totalPrice = res.total;
            },
            error: (err) => {
                console.error('failed', err);
            },
        });
    }

    handleOrder() {
        if (this.products.length === 0) {
            return;
        }

        const cartItems: ProductItem[] = this.products.map((product) => ({
            productID: product.productID,
            quantity: product.quantity,
        }));

        this.orderService.placeOrder(cartItems).subscribe({
            next: (res) => {
                console.log('success order', res);
                this.msgService.add({
                    severity: 'success',
                    summary: 'Order Placed',
                });
                this.cartService.deleteCart().subscribe({
                    next: (res) => {
                        console.log('success delete', res);
                        this.products = [];
                        this.totalPrice = 0;
                        this.totalRecords = 0;
                        this.productListComponent?.loadProducts?.();
                        this.msgService.add({
                            severity: 'success',
                            summary: 'Cart is empty',
                        });
                    },
                    error: (err) => {
                        console.error('failed', err);
                    },
                });
            },
            error: (err) => {
                console.error('failed', err);
            },
        });

        console.log('Order has been placed!');
    }

    onRemoveClicked(productID: string) {
        console.log('trying to remove');
        const item: ProductItem = { productID: productID, quantity: 0 };
        this.cartService.updateCartItemQuantity(item).subscribe({
            next: () => {
                this.products = this.products.filter((p) => p.productID !== productID);
                this.totalRecords = this.products.length;
                this.productListComponent.loadProducts();
                this.cartService.getCartPrice().subscribe({
                    next: (res) => {
                        console.log('success price', res);
                        this.totalPrice = res.total;
                    },
                    error: (err) => {
                        console.error('failed', err);
                    },
                });
            },
            error: (err) => {
                console.error('Remove failed', err);
            },
        });
    }

    fetchProducts = (page: number, limit: number): Observable<ProductFull[]> => {
        const start = (page - 1) * limit;
        const end = start + limit;
        const sliced = this.products.slice(start, end);
        console.log(this.products);
        return of(sliced);
    };
}

//   products: ProductFull[]  = [  // צריכים להגיע מהפופאפ של היוזר ולהתווסף לפה
//   {// כרגע זה רק דוגמא
//     productID:"2",
//     name: 'Bamba',
//     price: 4.99,
//     description: 'Classic peanut snack.',
//     quantity: 30,
//     imageUrl: 'assets/images/bamba.png'
//   },
//   {
//     productID:"2",
//     name: 'Chocolate Bar',
//     price: 6.5,
//     description: 'High-quality milk chocolate.',
//     quantity: 12,
//     imageUrl: 'https://images.weserv.nl/?url=images.snack/2.jpg'
//   },
//   {
//     productID:"a",
//     name: 'Coca-Cola Can',
//     price: 3.5,
//     description: 'Refreshing fizzy drink.',
//     quantity: 24,
//     imageUrl: 'https://images.weserv.nl/?url=images.snack/3.jpg'
//   },
//   {
//     productID:"1",
//     name: 'Potato Chips',
//     price: 5.0,
//     description: 'Crunchy salted chips.',
//     quantity: 50,
//     imageUrl: 'https://images.weserv.nl/?url=images.snack/4.jpg'
//   },
//   {
//     productID:"d0",
//     name: 'Energy Drink',
//     price: 8.0,
//     description: 'Boost your energy anytime.',
//     quantity: 18,
//     imageUrl: 'https://images.weserv.nl/?url=images.snack/5.jpg'
//   },
// ];
