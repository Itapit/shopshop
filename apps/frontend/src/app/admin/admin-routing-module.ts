import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsMasterComponent } from '../analytics/analytics-master/analytics-master.component';
import { RouteIds } from '../state/router/route-ids';

const routes: Routes = [
    {
        path: 'stats',
        component: AnalyticsMasterComponent,
        data: { routeId: RouteIds.AdminStats },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
