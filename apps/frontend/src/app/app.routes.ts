import { Route } from '@angular/router';
import { Role } from '@common/Enums';
import { RoleGuard } from './auth/guards/role.guard';

export const appRoutes: Route[] = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin-module').then((m) => m.AdminModule),
        canActivate: [RoleGuard],
        data: { expectedRole: Role.Admin },
    },
    {
        path: 'cart',
        loadChildren: () => import('./cart/cart-module').then((m) => m.CartModule),
        canActivate: [RoleGuard],
        data: { expectedRole: Role.Client },
    },
    {
        path: '',
        loadChildren: () => import('./products/products-module').then((m) => m.ProductsModule),
    },
];
