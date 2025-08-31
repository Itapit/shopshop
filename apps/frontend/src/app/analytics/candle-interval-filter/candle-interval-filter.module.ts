import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DateRangeFilterModule } from '../date-range-filter/date-range.module';
import { CandleIntervalFilterComponent } from './candle-interval-filter.component';

@NgModule({
    declarations: [CandleIntervalFilterComponent],
    imports: [CommonModule, DropdownModule, DateRangeFilterModule, FormsModule],
    exports: [CandleIntervalFilterComponent],
})
export class CandleIntervalFilterModule {}
