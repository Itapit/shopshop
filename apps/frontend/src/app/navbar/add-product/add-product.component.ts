import { Component, EventEmitter, Output, signal } from '@angular/core';
import { EditProductDialogComponent } from '../../admin/edit-product-dialog/edit-product-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-add-product',
    standalone: false,
    templateUrl: './add-product.component.html',
    styleUrl: './add-product.component.css',
})
export class AddProductComponent {

    @Output() productUpdated = new EventEmitter<void>();

    constructor(private dialogService: DialogService) {}

    openDialog() {
            const ref = this.dialogService.open(EditProductDialogComponent, {
                data: { type: 'add' },
                header: 'Add Product',
                width: '500px',
            });
    
            ref.onClose.subscribe((updated: boolean) => {
            if (updated) {
                this.productUpdated.emit();
            }
        });
        }
    buttonText = signal('Add Product');
}
