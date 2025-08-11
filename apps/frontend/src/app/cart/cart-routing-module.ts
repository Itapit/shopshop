import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '@common/Enums';
import { RoleGuard } from '../auth/guards/role.guard';
import { RouteId } from '../state/router/route-ids';
import { CartComponent } from './cart.component';

const routes: Routes = [
    {
        path: 'cart',
        component: CartComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: Role.Client, RouteId: RouteId.Cart },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CartRoutingModule {}
