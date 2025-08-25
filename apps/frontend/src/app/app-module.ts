import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AuthModule } from './auth/auth-module';
import { WithCredentialsInterceptor } from './auth/interceptors/with-credential.interceptor';
import { CartModule } from './cart/cart-module';
import { NavbarModule } from './navbar/navbar-module';
import { OrderModule } from './order/order-module';
import { ProductsModule } from './products/products-module';
import { AppStoreModule } from './state/app-store/app-store.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        NavbarModule,
        ProductsModule,
        CartModule,
        AuthModule,
        ToastModule,
        ConfirmDialogModule,
        AppStoreModule,
        OrderModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            name: 'shopshop ngrx',
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: WithCredentialsInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
