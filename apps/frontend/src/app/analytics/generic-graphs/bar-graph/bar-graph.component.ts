import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
    selector: 'app-bar-graph',
    standalone: false,
    templateUrl: './bar-graph.component.html',
    styleUrls: ['./bar-graph.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarGraphComponent {
    @Input() data!: ChartData;
    @Input() options: ChartOptions = {};
    @Input() loading = false;
    @Input() error: string | null = null;
    @Input() description: string | null = null;
}
