import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductFull } from '@common/Interfaces';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { productListOptionsEnum } from '../products/product-list/product-list-options-enum';
import { ProductListComponent } from '../products/product-list/product-list.component';
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


    productListOptionsEnum = productListOptionsEnum;

    constructor(
        private cartStore: Store,
    ) {}

    ngOnInit() {
        this.items$ = this.cartStore.select(selectItems);
        this.total$ = this.cartStore.select(selectTotal);
        this.loading$ = this.cartStore.select(selectLoading);

        this.cartStore.dispatch(loadCart());
        this.cartStore.dispatch(loadTotal());
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

    
    onRemoveClicked(productID: string) {
        this.cartStore.dispatch(removeItem({ productID }));
        this.productListComponent?.loadProducts?.();
    }
}
