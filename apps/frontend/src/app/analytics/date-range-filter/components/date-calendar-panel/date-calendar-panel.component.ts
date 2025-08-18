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
    // Control visibility from parent
    @Input() open = false;
    // init selection from global at start
    @Input() initialRange: DateRange | null = null;
    @Input() disabled = false;

    //Emit on every pick/change (range may be partial until two dates picked)
    @Output() rangeChange = new EventEmitter<DateRange | null>();
    //Emit Apply with the chosen range (non-null)
    @Output() apply = new EventEmitter<DateRange>();
    // Emit Cancel/Close
    @Output() cancel = new EventEmitter<void>();

    selected: Date[] | null = null;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['open'] || changes['initialRange']) {
            if (this.open && this.initialRange) {
                this.selected = [new Date(this.initialRange.start), new Date(this.initialRange.end)];
            } else if (this.open && !this.initialRange) {
                this.selected = null;
            }
        }
    }

    onModelChange(v: Date[] | null) {
        this.selected = v;
        if (!v || v.length < 2) {
            this.rangeChange.emit(null);
            return;
        }
        const [start, end] = v;
        this.rangeChange.emit({ start, end });
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
