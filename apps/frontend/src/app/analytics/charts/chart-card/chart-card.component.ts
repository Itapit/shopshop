import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-card',
  standalone: false,
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCardComponent {
  @Input() title = '';
  @Input() data!: ChartData;              
  @Input() options: ChartOptions = {};
  @Input() loading = false;
  @Input() error: string | null = null;
  @Input() description: string | null = null;
}
