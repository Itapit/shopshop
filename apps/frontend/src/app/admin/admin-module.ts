import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminComponent } from './admin.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AdminComponent, EditProductDialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    EditProductDialogComponent
  ]
})
export class AdminModule { }
