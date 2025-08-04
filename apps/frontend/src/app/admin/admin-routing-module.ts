import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersStatsComponent } from './orders-stats/orders-stats.component';
import { AdminGuard } from '../auth/guards/admin.guard';

const routes: Routes = [
  {path: 'stats', component:OrdersStatsComponent, canActivate:[AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
