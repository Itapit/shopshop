import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { AnalyticsModule } from '../analytics/analytics-module';
import { AdminRoutingModule } from './admin-routing-module';
import { AdminComponent } from './admin.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { OrdersStatsComponent } from './orders-stats/orders-stats.component';

@NgModule({
    declarations: [AdminComponent, EditProductDialogComponent, OrdersStatsComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        DynamicDialogModule,
        ReactiveFormsModule,
        InputNumberModule,
        InputTextModule,
        ButtonModule,
        AnalyticsModule,
    ],
    exports: [EditProductDialogComponent],
})
export class AdminModule {}
