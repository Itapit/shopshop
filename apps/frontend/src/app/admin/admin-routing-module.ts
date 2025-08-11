import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteIds } from '../state/router/route-ids';
import { OrdersStatsComponent } from './orders-stats/orders-stats.component';

const routes: Routes = [
    {
        path: 'stats',
        component: OrdersStatsComponent,
        data: { routeId: RouteIds.AdminStats },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
