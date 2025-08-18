import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { RouteIds } from '../state/router/route-ids';

const routes: Routes = [
    {
        path: 'stats',
        component: AnalyticsComponent,
        data: { routeId: RouteIds.AdminStats },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
