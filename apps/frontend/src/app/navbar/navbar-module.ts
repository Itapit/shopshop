import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing-module';
import { SignInLinkComponent } from './sign-in-link/sign-in-link.component';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [SignInLinkComponent, NavbarComponent],
  imports: [CommonModule, NavbarRoutingModule],
  exports: [NavbarComponent]
})
export class NavbarModule {}
