import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
    },
    {
        path: '',
        loadChildren: () => import('./products/products-module').then((m) => m.ProductsModule),
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin-module').then((m) => m.AdminModule),
    },
    {
        path: 'cart',
        loadChildren: () => import('./cart/cart-module').then((m) => m.CartModule),
    },
];
