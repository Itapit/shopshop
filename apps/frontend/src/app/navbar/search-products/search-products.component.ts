import { Component } from '@angular/core';
import { UiStateService } from '../../shared/ui-state.service';

@Component({
    selector: 'app-search-products',
    standalone: false,
    templateUrl: './search-products.component.html',
    styleUrl: './search-products.component.css',
})
export class SearchProductsComponent {
    value: string = '';
    constructor(private uiStateService: UiStateService) {}

    onSearch() {
        this.uiStateService.triggerSearch(this.value);
    }
}
