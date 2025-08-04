import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersStatsComponent } from './orders-stats/orders-stats.component';

const routes: Routes = [
  {path: 'stats', component:OrdersStatsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
