import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { AnalyticsMasterModule } from '../analytics/analytics-master/analytics-master.module';
import { AdminRoutingModule } from './admin-routing-module';
import { AdminComponent } from './admin.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';

@NgModule({
    declarations: [AdminComponent, EditProductDialogComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        DynamicDialogModule,
        ReactiveFormsModule,
        InputNumberModule,
        InputTextModule,
        ButtonModule,
        AnalyticsMasterModule,
    ],
    exports: [EditProductDialogComponent],
})
export class AdminModule {}
