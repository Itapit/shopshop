import { Route } from '@angular/router';
import { UserComponent } from './user/user.component';

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
    path: 'user',
    component: UserComponent
  }
];