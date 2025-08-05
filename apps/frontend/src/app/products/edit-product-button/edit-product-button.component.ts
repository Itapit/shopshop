import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductFull } from '@common/Interfaces';
import { DialogService } from 'primeng/dynamicdialog';
import { EditProductDialogComponent } from '../../admin/edit-product-dialog/edit-product-dialog.component';

@Component({
    selector: 'app-edit-product-button',
    standalone: false,
    templateUrl: './edit-product-button.component.html',
    styleUrl: './edit-product-button.component.css',
    providers: [DialogService],
})
export class EditProductButtonComponent {
    @Input() product!: ProductFull;
    @Output() productUpdated = new EventEmitter<void>();

    constructor(private dialogService: DialogService) {}

    openDialog() {
        const ref = this.dialogService.open(EditProductDialogComponent, {
            data: { product: this.product },
            header: 'Edit Product',
            width: '500px',
        });

        ref.onClose.subscribe((updated: boolean) => {
            if (updated) {
                this.productUpdated.emit();
            }
        });
    }
}
