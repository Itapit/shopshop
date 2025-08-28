import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { DateRangeObj } from '@common/Interfaces';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { DateRangeLocalSignalStore, DateRangeOptions } from '../../date-range-filter';

@Component({
    selector: 'app-graph-wrapper',
    standalone: false,
    templateUrl: './graph-wrapper.component.html',
    styleUrls: ['./graph-wrapper.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DateRangeLocalSignalStore],
})
export class GraphWrapperComponent implements OnInit, OnDestroy {
    @Input() title = '';
    @Input({ required: true }) chartType!: ChartType;
    @Input() description: string | null = null;

    @Input({ required: true }) mode: 'custom' | 'general' = 'general';

    // custom: loader that receives the current local DateRange and returns ChartData
    @Input() load?: (q: DateRangeObj) => Observable<ChartData<ChartType>>;

    // general direct data stream to render
    @Input() dataStream$?: Observable<ChartData<ChartType>>;
    //Optional general mode loading/error streams
    @Input() loadingStream$?: Observable<boolean>;
    @Input() errorStream$?: Observable<string | null>;

    // Optional extra chart options to merge on top of base options
    @Input() extraOptions: ChartOptions<ChartType> = {};

    DateRangeOptions = DateRangeOptions;

    //custom
    private dataSub = new BehaviorSubject<ChartData<ChartType>>({ labels: [], datasets: [] });
    private loadingSub = new BehaviorSubject<boolean>(false);
    private errorSub = new BehaviorSubject<string | null>(null);

    data$!: Observable<ChartData<ChartType>>;
    loading$!: Observable<boolean>;
    error$!: Observable<string | null>;

    readonly local = inject(DateRangeLocalSignalStore);

    /** Base chart options */
    private readonly baseOptions: ChartOptions<ChartType> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: true } },
        layout: { padding: 0 },
    };

    get options(): ChartOptions<ChartType> {
        return { ...this.baseOptions, ...(this.extraOptions as any) };
    }

    readonly query = computed<DateRangeObj | null>(() => {
        const r = this.local.effectiveRange();
        return r ? { start: r.start, end: r.end } : null;
    });

    private readonly reloadEffect = effect((onCleanup) => {
        if (this.mode !== 'custom') return;
        if (!this.load) return;

        const q = this.query();
        if (!q) return;

        this.loadingSub.next(true);
        const sub = this.load(q)
            .pipe(finalize(() => this.loadingSub.next(false)))
            .subscribe({
                next: (d) => this.dataSub.next(d),
                error: (e) => this.errorSub.next(e?.message ?? 'Failed to load'),
            });

        onCleanup(() => sub.unsubscribe());
    });

    ngOnInit(): void {
        if (this.mode === 'general') {
            this.data$ = this.dataStream$ ?? this.dataSub.asObservable();
            this.loading$ = this.loadingStream$ ?? this.loadingSub.asObservable();
            this.error$ = this.errorStream$ ?? this.errorSub.asObservable();
        } else {
            this.data$ = this.dataSub.asObservable();
            this.loading$ = this.loadingSub.asObservable();
            this.error$ = this.errorSub.asObservable();
        }
    }

    ngOnDestroy(): void {}
}
