import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-stats-link',
  standalone: false,
  templateUrl: './stats-link.component.html',
  styleUrl: './stats-link.component.css'
})
export class StatsLinkComponent {
  buttonText = signal('Statistics');
}
