import { Route } from '@angular/router';
import { CartComponent } from './cart/cart.component';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-module').then((m) => m.AuthModule)
  } , 
  {
    path: '',
    loadChildren: () => import('./products/products-module').then((m) => m.ProductsModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart-module').then((m) => m.CartModule)
  }
];