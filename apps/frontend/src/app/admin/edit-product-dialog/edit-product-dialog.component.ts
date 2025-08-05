import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductFull, UpdateProductRequest } from '@common/Interfaces';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminProductsService } from '../services/admin-products.service';

@Component({
    selector: 'app-edit-product-dialog',
    standalone: false,
    templateUrl: './edit-product-dialog.component.html',
    styleUrl: './edit-product-dialog.component.css',
})
export class EditProductDialogComponent {
    form: FormGroup;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private msgService: MessageService,
        private adminService: AdminProductsService
    ) {
        const product: ProductFull = this.config.data.product;

        this.form = this.fb.group({
            id: [product.productID],
            name: [product.name, Validators.required],
            description: [product.description, Validators.required],
            price: [product.price, [Validators.required, Validators.min(0)]],
            quantity: [
                product.quantity,
                [Validators.required, Validators.min(0)],
            ],
            imageUrl: [product.imageUrl],
        });
    }

    submit() {
        console.log(this.form.value);
        if (this.form.invalid) return;

        this.isSubmitting = true;

        const id: string = this.form.value.id;

        const payload: UpdateProductRequest = {
            name: this.form.value.name,
            description: this.form.value.description,
            price: this.form.value.price,
            quantity: this.form.value.quantity,
            imageUrl: this.form.value.imageUrl,
        };

        this.adminService.updateProduct(id, payload).subscribe({
            next: () => {
                this.msgService.add({
                    severity: 'success',
                    summary: 'Product updated',
                });
                this.ref.close(true);
            },
            error: (err) => {
                this.msgService.add({
                    severity: 'error',
                    summary: 'Update failed',
                    detail: err.message,
                });
                this.isSubmitting = false;
            },
        });
    }

    cancel() {
        this.ref.close(false);
    }
}
