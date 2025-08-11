import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteId } from '../state/router/route-ids';
import { ProductsComponent } from './products.component';

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        data: { RouteId: RouteId.Home },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule {}
