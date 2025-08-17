import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { DateRangeOptionsEnum, DateRangeSelection } from './date-range.model';

@Component({
    selector: 'app-date-range',
    standalone: false,
    templateUrl: './date-range.component.html',
    styleUrl: './date-range.component.css',
})
export class DateRangeComponent {
    @Input() mode!: DateRangeOptionsEnum;
    // two way bind this so parent knows if override is on
    @Input() customEnabled = false;
    @Output() customEnabledChange = new EventEmitter<boolean>();
    // emit when user changes local range
    @Output() selectionChange = new EventEmitter<DateRangeSelection>();

    private store = inject(Store);
}
