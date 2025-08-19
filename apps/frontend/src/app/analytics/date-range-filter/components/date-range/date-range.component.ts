import { ChangeDetectionStrategy, Component, computed, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DateRangeObj } from '@common/Interfaces';
import { DateRangeFacade } from '../../../store/analytics.facade';
import { DatePresetKey, DateRangeOptions } from '../../enums';
import { DateRangeLocalSignalStore } from '../../signal-store';

@Component({
    selector: 'app-date-range',
    standalone: false,
    templateUrl: './date-range.component.html',
    styleUrl: './date-range.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,

    providers: [DateRangeLocalSignalStore],
})
export class DateRangeComponent implements OnInit, OnDestroy {
    @Input() mode: DateRangeOptions = DateRangeOptions.Global;
    DatePresetKey = DatePresetKey;

    private facade = inject(DateRangeFacade);
    public local = inject(DateRangeLocalSignalStore);

    readonly globalRange = toSignal(this.facade.globalRange$, { initialValue: null });
    readonly globalPreset = toSignal(this.facade.globalPreset$, { initialValue: null });

    readonly isLocal = computed(() => this.mode === DateRangeOptions.Local);
    readonly controlsDisabled = computed(() => this.isLocal() && !this.local.enabled());

    readonly activePreset = computed<DatePresetKey | null>(() => {
        if (this.isLocal()) {
            return this.local.effectivePreset() ?? this.globalPreset();
        }
        return this.globalPreset();
    });

    private unsubscribe?: () => void;

    ngOnInit(): void {
        // Keep the SignalStore snapshot of global up to date
        const sub = this.facade.globalRange$.subscribe((r) => this.local.updateGlobalSnapshot(r));
        this.unsubscribe = () => sub.unsubscribe();
    }

    ngOnDestroy(): void {
        this.unsubscribe?.();
    }

    onToggleLocal(enabled: boolean) {
        this.local.setEnabled(enabled);
    }

    onPresetClick(preset: DatePresetKey) {
        if (this.controlsDisabled()) return;

        if (!this.isLocal()) {
            this.facade.setPreset(preset);
        } else {
            this.local.setLocalPreset(preset);
        }
    }

    openCalendar() {
        if (this.controlsDisabled()) return;
        this.local.openCalendar(this.local.effectiveRange());
    }

    onCalendarRangeChange(r: DateRangeObj | null) {
        this.local.stageWorkingRange(r);
    }

    onCalendarApply(r: DateRangeObj) {
        if (!this.isLocal()) {
            this.facade.setCustom(r);
        } else {
            this.local.setLocalRange(r);
        }
        this.local.closeCalendar();
    }

    onCalendarCancel() {
        this.local.closeCalendar();
    }
}
