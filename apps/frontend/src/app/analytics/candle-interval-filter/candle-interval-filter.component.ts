import { ChangeDetectionStrategy, Component, Input, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CandleInterval } from '@common/Enums';
import { AnalyticsGlobalFacade } from '../analytics-master/store/analytics.facade';
import { CandleIntervalOptions } from './enums/candle-interval-options.enum';
import { CandleIntervalFilterStore } from './signal-store';

@Component({
    selector: 'app-candle-interval-filter',
    standalone: false,
    templateUrl: './candle-interval-filter.component.html',
    styleUrls: ['./candle-interval-filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CandleIntervalFilterStore],
})
export class CandleIntervalFilterComponent {
    @Input() mode: CandleIntervalOptions = CandleIntervalOptions.Global; //TODO as of now it does update the store but doesnt send a new request

    private facade = inject(AnalyticsGlobalFacade);

    private parentStore = inject(CandleIntervalFilterStore, { optional: true, skipSelf: true });
    public local = this.parentStore ?? inject(CandleIntervalFilterStore);

    // global as signal
    readonly globalInterval = toSignal(this.facade.globalCandleInterval$, { initialValue: null });

    readonly isLocal = computed(() => this.mode === CandleIntervalOptions.Local);
    readonly controlsDisabled = computed(() => this.isLocal() && !this.local.enabled());

    // active value the UI shows
    readonly activeInterval = computed<CandleInterval | null>(() => {
        if (this.isLocal()) {
            return this.local.effectiveInterval() ?? this.globalInterval();
        }
        return this.globalInterval();
    });

    constructor() {
        // keep local store snapshot of global up to date
        effect(() => {
            this.local.updateGlobalSnapshot(this.globalInterval());
        });
    }

    onToggleLocal(enabled: boolean) {
        this.local.setEnabled(enabled);
    }

    onIntervalChange(interval: CandleInterval) {
        if (this.controlsDisabled()) return;

        if (!this.isLocal()) {
            // global mode -> update the global store
            this.facade.setInterval(interval);
        } else {
            // local mode -> update only local store
            this.local.setLocalInterval(interval);
        }
    }
}
