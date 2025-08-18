import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { DateRange } from '../../interfaces';

@Component({
    selector: 'app-date-calendar-panel',
    standalone: false,
    templateUrl: './date-calendar-panel.component.html',
    styleUrls: ['./date-calendar-panel.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateCalendarPanelComponent implements OnChanges {
    @Input() open = false;
    @Input() initialRange: DateRange | null = null;
    @Input() disabled = false;

    @Output() rangeChange = new EventEmitter<DateRange | null>();
    @Output() apply = new EventEmitter<DateRange>();
    @Output() cancel = new EventEmitter<void>();

    selected: Date[] | null = null;

    defaultDate: Date = new Date();

    ngOnChanges(changes: SimpleChanges): void {
        const anchor = toDateOrNull(this.initialRange?.end) ?? new Date();
        this.defaultDate = anchor;

        // Seed selection ONLY if both dates are valid and panel is open
        if ((changes['open'] || changes['initialRange']) && this.open) {
            const start = toDateOrNull(this.initialRange?.start);
            const end = toDateOrNull(this.initialRange?.end);
            this.selected = start && end ? [start, end] : null;
        }
    }

    onModelChange(v: Date[] | null) {
        const clean = Array.isArray(v) ? v.filter(isRealDate) : [];
        this.selected = clean.length ? clean : null;

        if (this.selected && this.selected.length === 2) {
            const [start, end] = this.selected;
            this.rangeChange.emit({ start, end });
        } else {
            this.rangeChange.emit(null);
        }
    }

    onApply() {
        if (!this.selected || this.selected.length < 2) return;
        const [start, end] = this.selected;
        this.apply.emit({ start, end });
    }

    onCancel() {
        this.cancel.emit();
    }
}

function toDateOrNull(value: unknown): Date | null {
    if (value instanceof Date) return isNaN(value.getTime()) ? null : new Date(value);
    if (typeof value === 'string' || typeof value === 'number') {
        const d = new Date(value);
        return isNaN(d.getTime()) ? null : d;
    }
    return null;
}
function isRealDate(d: unknown): d is Date {
    return d instanceof Date && !isNaN(d.getTime());
}
