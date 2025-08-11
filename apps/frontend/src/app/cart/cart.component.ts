import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductFull } from '@common/Interfaces';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { OrderService } from '../order/services/order.service';
import { productListOptionsEnum } from '../products/product-list/product-list-options-enum';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { UiStateService } from '../shared/ui-state.service';
import { CartService } from './services/cart.service';
import { clearCartSuccess, loadCart, loadTotal, removeItem } from './state/cart.actions';
import { selectItems, selectLoading, selectTotal } from './state/cart.selectors';
import { placeOrderSuccess } from '../order/state/order.actions';

@Component({
    selector: 'app-cart',
    standalone: false,
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class CartComponent {
    @ViewChild(ProductListComponent) productListComponent!: ProductListComponent;

    items$!: Observable<ProductFull[]>;
    total$!: Observable<number | null>;
    loading$!: Observable<boolean>;

    private actions$ = inject(Actions);

    productListOptionsEnum = productListOptionsEnum;

    constructor(
        private store: Store,
        private msgService: MessageService,
        private uiStateService: UiStateService,
        private cartService: CartService,
        private orderService: OrderService
    ) {}

    ngOnInit() {
        this.items$ = this.store.select(selectItems);
        this.total$ = this.store.select(selectTotal);
        this.loading$ = this.store.select(selectLoading);

        this.actions$
            .pipe(ofType(placeOrderSuccess))
            .subscribe(() => this.msgService.add({ severity: 'success', summary: 'Order Placed' })); 
        this.actions$
            .pipe(ofType(clearCartSuccess))
            .subscribe(() => {
                this.msgService.add({ severity: 'success', summary: 'Cart is empty' });
                this.productListComponent?.loadProducts?.();
            });
           

        this.store.dispatch(loadCart());
        this.store.dispatch(loadTotal());
    }

    fetchProducts = (page: number, limit: number, keyword: string): Observable<ProductFull[]> => {
        const norm = (s: string) => (s ?? '').toLowerCase();
        const k = norm(keyword);

        return this.items$.pipe(
            map((items) => {
                const filtered = k ? items.filter((p) => norm(p.name).includes(k)) : items;

                const start = (page - 1) * limit;
                return filtered.slice(start, start + limit);
            })
        );
    };

    // async handleOrder() {
    //     // if (this.products.length === 0) {
    //     //     return;
    //     // }

    //     // const cartItems: ProductItem[] = this.products.map((product) => ({
    //     //     productID: product.productID,
    //     //     quantity: product.quantity,
    //     // }));

    //     // this.orderService.placeOrder(cartItems).subscribe({
    //     //     next: (res) => {
    //     //         console.log('success order', res);
    //     //         this.msgService.add({
    //     //             severity: 'success',
    //     //             summary: 'Order Placed',
    //     //         });
    //     //         this.cartService.deleteCart().subscribe({
    //     //             next: (res) => {
    //     //                 console.log('success delete', res);
    //     //                 this.products = [];
    //     //                 this.totalPrice = 0;
    //     //                 this.totalRecords = 0;
    //     //                 this.productListComponent?.loadProducts?.();
    //     //                 this.msgService.add({
    //     //                     severity: 'success',
    //     //                     summary: 'Cart is empty',
    //     //                 });
    //     //             },
    //     //             error: (err) => {
    //     //                 console.error('failed', err);
    //     //             },
    //     //         });
    //     //     },
    //     //     error: (err) => {
    //     //         console.error('failed', err);
    //     //     },
    //     // });

    //     //console.log('Order has been placed!');
    //     const items = await firstValueFrom(this.items$);
    //     if (!items || items.length === 0) return;
    //     this.productListComponent?.loadProducts?.();

    // }

    onRemoveClicked(productID: string) {
        this.store.dispatch(removeItem({ productID }));
        this.productListComponent?.loadProducts?.();
    }
}
