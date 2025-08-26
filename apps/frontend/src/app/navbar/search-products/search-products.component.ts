import { Component, inject } from '@angular/core';
import { UiStateService } from '../../shared/ui-state.service';
import { ProductsState } from '../../products/state/products.state';
import { Store } from '@ngrx/store';
import { selectProductsLoading } from '../../products/state/products.selectors';

@Component({
    selector: 'app-search-products',
    standalone: false,
    templateUrl: './search-products.component.html',
    styleUrl: './search-products.component.css',
})
export class SearchProductsComponent {
    value: string = '';
    constructor(private uiStateService: UiStateService) {} 

    private store = inject(Store<{products: ProductsState}>);

    loading$ = this.store.select(selectProductsLoading);

    onSearch() {
        this.uiStateService.triggerSearch(this.value);
    }
}
