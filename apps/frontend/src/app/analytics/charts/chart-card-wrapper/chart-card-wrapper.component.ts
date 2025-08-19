import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-chart-card-wrapper',
  standalone: false,
  templateUrl: './chart-card-wrapper.component.html',
  styleUrls: ['./chart-card-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCardWrapperComponent{}