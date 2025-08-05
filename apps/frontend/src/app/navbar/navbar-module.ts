import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CartLinkComponent } from './cart-link/cart-link.component';
import { NavbarRoutingModule } from './navbar-routing-module';
import { NavbarComponent } from './navbar.component';
import { OrderComponent } from './order/order.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { SignInLinkComponent } from './sign-in-link/sign-in-link.component';
import { SignUpLinkComponent } from './sign-up-link/sign-up-link.component';
import { StatsLinkComponent } from './stats-link/stats-link.component';
import { WebsiteLogoComponent } from './website-logo/website-logo.component';

@NgModule({
    declarations: [
        SignInLinkComponent,
        NavbarComponent,
        SearchProductsComponent,
        WebsiteLogoComponent,
        OrderComponent,
        SignUpLinkComponent,
        StatsLinkComponent,
        CartLinkComponent,
    ],
    imports: [CommonModule, NavbarRoutingModule, ButtonModule, FormsModule, InputTextModule],
    exports: [NavbarComponent],
})
export class NavbarModule {}
