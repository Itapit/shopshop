import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DateCalendarPanelComponent } from './components/date-calendar-panel/date-calendar-panel.component';
import { DateOverrideToggleComponent } from './components/date-override-toggle/date-override-toggle.component';
import { DatePresetButtonsComponent } from './components/date-preset-buttons/date-preset-buttons.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { DateRangeLabelPipe } from './pipes/date-range-label.pipe';
import { DateShortPipe } from './pipes/date-short.pipe';
import { PresetLabelPipe } from './pipes/preset-label.pipe';

@NgModule({
    declarations: [
        DateRangeComponent,
        DateCalendarPanelComponent,
        DatePresetButtonsComponent,
        DateOverrideToggleComponent,
    ],
    imports: [
        CommonModule,
        PresetLabelPipe,
        DateShortPipe,
        DateRangeLabelPipe,
        InputSwitchModule,
        ButtonModule,
        CalendarModule,
        OverlayPanelModule,
        ChipModule,
    ],
    exports: [DateRangeComponent],
})
export class DateRangeFilterModule {}
