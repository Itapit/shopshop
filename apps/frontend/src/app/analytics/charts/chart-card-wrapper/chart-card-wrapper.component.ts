import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DateRangeObj } from '@common/Interfaces';
import { ChartData, ChartOptions } from 'chart.js';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { DateRangeLocalSignalStore, DateRangeOptions } from '../../date-range-filter';
import { DateRangeFacade } from '../../store/analytics.facade';

type OverviewKeys = 'unitsSold' | 'distinctProducts' | 'newCustomers' | 'profit';

type Source =
    | { type: 'overview'; keys: OverviewKeys[] }
    | { type: 'special'; load: (q: DateRangeObj) => Observable<ChartData<'bar' | 'line'>> };

@Component({
    selector: 'app-chart-card-wrapper',
    standalone: false,
    templateUrl: './chart-card-wrapper.component.html',
    styleUrls: ['./chart-card-wrapper.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DateRangeLocalSignalStore],
})
export class ChartCardWrapperComponent implements OnInit, OnDestroy {
    @Input() title = '';
    @Input({ required: true }) source!: Source;
    @Input() chartType: 'bar' | 'line' = 'bar';
    @Input() description: string | null = null;
    DateRangeOptions = DateRangeOptions;

    private dataSub = new BehaviorSubject<ChartData<'bar' | 'line'>>({ labels: [], datasets: [] });
    private loadingSub = new BehaviorSubject<boolean>(false);
    private errorSub = new BehaviorSubject<string | null>(null);

    data$!: Observable<ChartData<'bar' | 'line'>>;
    loading$!: Observable<boolean>;
    error$!: Observable<string | null>;

    private facade = inject(DateRangeFacade);
    readonly local = inject(DateRangeLocalSignalStore);

    readonly globalRangeSig = toSignal(this.facade.globalRange$, { initialValue: null });

    readonly options: ChartOptions<'bar' | 'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: true } },
    };

    readonly query = computed<DateRangeObj | null>(() => {
        const r = this.local.effectiveRange();
        return r ? { start: r.start, end: r.end } : null;
    });

    private readonly reloadEffect = effect(() => {
        if (this.source.type !== 'special') return;
        const q = this.query();
        if (!q) return;

        this.loadingSub.next(true);
        this.source
            .load(q)
            .pipe(finalize(() => this.loadingSub.next(false)))
            .subscribe({
                next: (d) => this.dataSub.next(d),
                error: (e) => this.errorSub.next(e?.message ?? 'Failed to load'),
            });
    });

    private seed = effect(() => {
        const g = this.globalRangeSig();
        if (g) this.local.updateGlobalSnapshot(g);
    });

    private cancelPrevious?: () => void;

    ngOnInit(): void {
        if (this.source.type === 'overview') {
            return;
        } else {
            this.data$ = this.dataSub.asObservable();
            this.loading$ = this.loadingSub.asObservable();
            this.error$ = this.errorSub.asObservable();
        }
    }

    ngOnDestroy(): void {
        this.cancelPrevious?.();
    }
}
