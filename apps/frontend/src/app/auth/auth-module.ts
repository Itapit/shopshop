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
import { LogoutListenerComponent } from './logout/log-out.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from "primeng/toast";
import { ConfirmationService } from 'primeng/api';

@NgModule({
    declarations: [SigninComponent, CreateUserComponent, UnauthorizedComponent , LogoutListenerComponent ],
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
    exports:[LogoutListenerComponent],
    providers:[ConfirmationService]
})
export class AuthModule {}
