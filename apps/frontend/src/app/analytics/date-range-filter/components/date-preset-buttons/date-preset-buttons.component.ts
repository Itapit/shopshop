import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePresetKey } from '../../enums';

@Component({
    selector: 'app-date-preset-buttons',
    standalone: false,
    templateUrl: './date-preset-buttons.component.html',
    styleUrl: './date-preset-buttons.component.css',
})
export class DatePresetButtonsComponent {
    @Input() disabled = false;
    @Input() active: DatePresetKey | null = null;

    @Output() presetClick = new EventEmitter<DatePresetKey>();
    @Output() openCustom = new EventEmitter<void>();

    readonly presets: DatePresetKey[] = [
        DatePresetKey.LAST_7,
        DatePresetKey.LAST_30,
        DatePresetKey.LAST_90,
        DatePresetKey.YTD,
        DatePresetKey.LAST_YEAR,
    ];

    onClick(p: DatePresetKey) {
        if (this.disabled) return;
        this.presetClick.emit(p);
    }

    onCustom() {
        if (this.disabled) return;
        this.openCustom.emit();
    }

    isActive(p: DatePresetKey) {
        return this.active === p;
    }
}
