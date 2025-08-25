import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductFull } from '@common/Interfaces';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { productListOptionsEnum } from '../products/product-list/product-list-options.enum';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { loadCart, loadTotal, removeItem } from './state/cart.actions';
import { selectItems, selectLoading, selectTotal } from './state/cart.selectors';
import { CartState } from './state/cart.state';

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

    constructor(private store: Store<{ cart: CartState }>) {}

    ngOnInit() {
        this.items$ = this.store.select(selectItems);
        this.total$ = this.store.select(selectTotal);
        this.loading$ = this.store.select(selectLoading);

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

    onRemoveClicked(productID: string) {
        this.store.dispatch(removeItem({ productID }));
        this.productListComponent?.loadProducts?.();
    }
}
