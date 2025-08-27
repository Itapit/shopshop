import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DateRangeObj } from '@common/Interfaces';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AnalyticsGlobalFacade } from '../../analytics-master/store/analytics.facade';
import { DateRangeLocalSignalStore, DateRangeOptions } from '../../date-range-filter';



type Source = { type: 'special'; load: (q: DateRangeObj) => Observable<ChartData<'bar' | 'line'>> };

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
    @Input({ required: true }) source!: Source;
    @Input({required: true}) chartType!: ChartType;
    @Input() description: string | null = null;
    DateRangeOptions = DateRangeOptions;

    private dataSub = new BehaviorSubject<ChartData<ChartType>>({ labels: [], datasets: [] });
    private loadingSub = new BehaviorSubject<boolean>(false);
    private errorSub = new BehaviorSubject<string | null>(null);

    data$!: Observable<ChartData<ChartType>>;
    loading$!: Observable<boolean>;
    error$!: Observable<string | null>;

    
    readonly local = inject(DateRangeLocalSignalStore);

    

    readonly options: ChartOptions<ChartType> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: true } },
        layout: { padding: 0 }
    };

    readonly query = computed<DateRangeObj | null>(() => {
        const r = this.local.effectiveRange();
        return r ? { start: r.start, end: r.end } : null;
    });

    private readonly reloadEffect = effect((onCleanup) => {
        if (this.source.type !== 'special') return;
        const q = this.query();
        if (!q) return;

        this.loadingSub.next(true);
        const sub = this.source
            .load(q)
            .pipe(finalize(() => this.loadingSub.next(false)))
            .subscribe({
                next: (d) => this.dataSub.next(d),
                error: (e) => this.errorSub.next(e?.message ?? 'Failed to load'),
            }); 
        onCleanup(() => sub.unsubscribe());
    });

    

    

    ngOnInit(): void {
        
            this.data$ = this.dataSub.asObservable();
            this.loading$ = this.loadingSub.asObservable();
            this.error$ = this.errorSub.asObservable();
        
    }

    ngOnDestroy(): void {
        
    }
}
