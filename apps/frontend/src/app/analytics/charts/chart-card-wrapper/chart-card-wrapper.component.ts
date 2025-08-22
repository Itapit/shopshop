import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
import { Store } from '@ngrx/store';

// === החלף/התאם לשמות הסלקטורים שלך ב-Store: ===
//import { selectOverviewChartData, selectOverviewLoading, selectOverviewError } from '../../../store/analytics.selectors';
// לדוגמה: selectOverviewChartData(keys: string[]) => Observable<ChartData<'bar'|'line'>>

type OverviewKeys = 'unitsSold' | 'distinctProducts' | 'newCustomers' | 'profit';

type Source =
  | { type: 'overview'; keys: OverviewKeys[] } // גנרי: מה-Store
  | { type: 'special';  load: () => Observable<ChartData<'bar'|'line'>> }; // מיוחד: טוען לבד

@Component({
  selector: 'app-chart-card-wrapper',
  standalone: false,
  templateUrl: './chart-card-wrapper.component.html',
  styleUrls: ['./chart-card-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartCardWrapperComponent implements OnInit, OnDestroy {
  @Input() title = '';
  @Input({ required: true }) source!: Source;
  @Input() chartType: 'bar' | 'line' = 'bar';

  private store = inject(Store);

  // אופציות בסיס
  readonly options: ChartOptions<'bar'|'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
    scales: { y: { beginAtZero: true } },
  };

  // נחשוף תמיד Observable-ים כדי לחבר ל-async pipe
  data$!: Observable<ChartData<'bar'|'line'>>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  // לסורס מיוחד — ערוצים מקומיים
  private dataSub = new BehaviorSubject<ChartData<'bar'|'line'>>({ labels: [], datasets: [] });
  private loadingSub = new BehaviorSubject<boolean>(false);
  private errorSub = new BehaviorSubject<string | null>(null);
  private sub?: Subscription;

  ngOnInit(): void {
    if (!this.source) return;

    if (this.source.type === 'overview') {
    //   // --- מצב גנרי: מושכים מה-Store הגלובלי ---
    //   this.data$    = this.store.select(selectOverviewChartData(this.source.keys));
    //   this.loading$ = this.store.select(selectOverviewLoading);
    //   this.error$   = this.store.select(selectOverviewError);
    } else {
      // --- מצב מיוחד: טוענים באופן עצמאי, מקומית בלבד ---
      this.data$    = this.dataSub.asObservable();
      this.loading$ = this.loadingSub.asObservable();
      this.error$   = this.errorSub.asObservable();

      this.loadingSub.next(true);
      this.sub = this.source.load().subscribe({
        next: d => this.dataSub.next(d),
        error: e => this.errorSub.next(e?.message ?? 'Failed to load'),
        complete: () => this.loadingSub.next(false),
      });
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
