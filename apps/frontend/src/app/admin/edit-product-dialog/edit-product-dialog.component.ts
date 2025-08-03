import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductFull } from '@common/Interfaces';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: false,
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.css'
})
export class EditProductDialogComponent {
  form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private msgService: MessageService
  ) {
    const product: ProductFull = this.config.data.product;

    this.form = this.fb.group({
      id: [product.productID],
      name: [product.name, Validators.required],
      description: [product.description, Validators.required],
      price: [product.price, [Validators.required, Validators.min(0)]],
      quantity: [product.quantity, [Validators.required, Validators.min(0)]],
      imageUrl: [product.imageUrl]
    });
  }

  submit() {
    console.log(this.config.data.product);
    if (this.form.invalid) return;

    this.isSubmitting = true;

    // this.adminService.updateProduct(this.form.value).subscribe({
    //   next: () => {
    //     this.msgService.add({ severity: 'success', summary: 'Product updated' });
    //     this.ref.close(true);
    //   },
    //   error: (err) => {
    //     this.msgService.add({ severity: 'error', summary: 'Update failed', detail: err.message });
    //     this.isSubmitting = false;
    //   }
    // });
  }

  cancel() {
    this.ref.close(false);
  }
}