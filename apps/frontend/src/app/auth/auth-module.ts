import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { FocusTrapModule } from 'primeng/focustrap';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthRoutingModule } from './auth-routing-module';
import { CreateUserComponent } from './create-user/create-user.component';
import { SigninComponent } from './sign-in/signin.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
    declarations: [SigninComponent, CreateUserComponent, UnauthorizedComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        FocusTrapModule,
        AutoFocusModule,
    ],
})
export class AuthModule {}
