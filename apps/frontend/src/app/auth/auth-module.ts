import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FocusTrapModule } from 'primeng/focustrap';
import { AutoFocusModule } from 'primeng/autofocus';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FocusTrapModule,
    AutoFocusModule
    ]
})
export class AuthModule { }
