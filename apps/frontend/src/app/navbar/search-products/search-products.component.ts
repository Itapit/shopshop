import { Component, inject } from '@angular/core';
import { ProductsFacade } from '../../products/store/products.facade';

@Component({
    selector: 'app-search-products',
    standalone: false,
    templateUrl: './search-products.component.html',
    styleUrl: './search-products.component.css',
})
export class SearchProductsComponent {
    private productsFacade = inject(ProductsFacade);

    value = '';

    loading$ = this.productsFacade.loading$;

    onSearch() {
        this.productsFacade.search(this.value);
    }
}
