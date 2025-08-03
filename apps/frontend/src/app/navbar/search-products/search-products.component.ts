import { trigger } from '@angular/animations';
import { SharedService } from './../../shared/shared.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-products',
  standalone: false,
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.css'
})
export class SearchProductsComponent {
  value: string = '' ;
  constructor(private sharedService: SharedService) {}
  
  onSearch() {
    
    this.sharedService.triggerSearch(this.value);
  }
}
