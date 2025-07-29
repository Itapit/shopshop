import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NavbarRoutingModule } from './navbar-routing-module';
import { SignInLinkComponent } from './sign-in-link/sign-in-link.component';
import { NavbarComponent } from './navbar.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { WebsiteLogoComponent } from './website-logo/website-logo.component';
import { OrderComponent } from './order/order.component';
import { AddItemComponent } from './add-item/add-item.component';

@NgModule({
  declarations: [SignInLinkComponent, NavbarComponent, SearchProductsComponent, WebsiteLogoComponent , OrderComponent , AddItemComponent],
  imports: [CommonModule, NavbarRoutingModule, ButtonModule, FormsModule, InputTextModule],
  exports: [NavbarComponent]
})
export class NavbarModule {}
