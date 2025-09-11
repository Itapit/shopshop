import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
    selector: 'app-graph',
    standalone: false,
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphComponent {
    @Input() data!: ChartData;
    @Input() options: ChartOptions = {};
    @Input() loading = false;
    @Input() error: string | null = null;
    @Input() description: string | null = null;
    @Input({ required: true }) chartType!: ChartType;
}
