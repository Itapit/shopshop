import { Component, Input } from '@angular/core';
import { FormatOptions } from './format-options.enum';

@Component({
    selector: 'app-kpi-tile',
    standalone: false,
    templateUrl: './kpi-tile.component.html',
    styleUrl: './kpi-tile.component.css',
})
export class KpiTileComponent {
    @Input() label!: string;
    @Input() value: number | null = null;
    @Input() loading = false;

    @Input() format: FormatOptions = FormatOptions.Number;
    @Input() currency = 'ILS';

    readonly FormatOptions = FormatOptions; //expose to html

    get isReady(): boolean {
        return !this.loading && this.value !== null && this.value !== undefined;
    }
}
