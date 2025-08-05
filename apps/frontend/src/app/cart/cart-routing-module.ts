import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from '@common/Enums';

const routes: Routes = [
    {
        path: 'cart',
        component: CartComponent,
        canActivate:[RoleGuard],
        data:{expectedRole: Role.Client}
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CartRoutingModule {}
