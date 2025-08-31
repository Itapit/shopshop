import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-date-override-toggle',
    standalone: false,
    templateUrl: './date-override-toggle.component.html',
    styleUrl: './date-override-toggle.component.css',
})
export class DateOverrideToggleComponent {
    @Input() enabled = false;
    @Input() disabled = false;
    @Input() label = 'Use custom range';

    @Output() enabledChange = new EventEmitter<boolean>();

    onSwitchChange(checked: boolean) {
        if (this.disabled) return;
        this.enabledChange.emit(checked);
    }
}
//TODO make this a standalone component in a shared folder between the filters
