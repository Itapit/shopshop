import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { WebsiteLogoComponent } from './website-logo/website-logo.component';
import { OrderComponent } from './order/order.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { SignInLinkComponent } from './sign-in-link/sign-in-link.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }
