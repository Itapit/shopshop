import { Component } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { UiStateService } from '../../shared/ui-state.service';

@Component({
    selector: 'app-log-out-link',
    standalone: false,
    templateUrl: './log-out.component.html',
    styleUrls: ['./log-out.component.css'],
})
export class LogOutComponent {
    constructor(
        private confirmationService: ConfirmationService,
        private uiStateService: UiStateService,
        private messageService: MessageService
    ) {}

    clickLogout() {
        console.log('clicked');
        this.confirmationService.confirm({
            message: 'Are you sure you want to log out?',
            header: 'Logout Confirmation',
            icon: 'pi pi-sign-out',
            acceptLabel: 'Yes, Log Out',
            rejectLabel: 'No, Stay Logged In',
            rejectButtonStyleClass: 'p-button-outlined p-button-secondary',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Logged Out',
                    detail: 'You have successfully logged out.',
                });
                this.uiStateService.triggerLogout();
            },
            reject: (type: ConfirmEventType) => {
                if (type === ConfirmEventType.REJECT || type === ConfirmEventType.CANCEL) {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Cancelled',
                        detail: 'Logout was cancelled.',
                    });
                }
            },
        });
    }
}
