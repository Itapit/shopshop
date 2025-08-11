import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FocusTrapModule } from 'primeng/focustrap';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { AuthRoutingModule } from './auth-routing-module';
import { CreateUserComponent } from './create-user/create-user.component';
import { LogoutListenerComponent } from './logout/log-out.component';
import { SigninComponent } from './sign-in/signin.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
    declarations: [SigninComponent, CreateUserComponent, UnauthorizedComponent, LogoutListenerComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        FocusTrapModule,
        AutoFocusModule,
        ConfirmDialogModule,
        ToastModule,
    ],
    exports: [LogoutListenerComponent],
    providers: [ConfirmationService],
})
export class AuthModule {}
