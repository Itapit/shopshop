import { Component } from '@angular/core';

@Component({
  selector: 'app-search-products',
  standalone: false,
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.css'
})
export class SearchProductsComponent {
  value: string | undefined;

  onSearch() {
    console.log('Search:', this.value);
  }
}
