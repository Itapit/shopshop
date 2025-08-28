import { Pipe, PipeTransform, inject } from '@angular/core';
import { DatePresetKey } from '../enums';
import { DATE_PRESET_LABELS } from '../services/date-preset-labels.token';

@Pipe({
    name: 'presetLabel',
    pure: true,
})
export class PresetLabelPipe implements PipeTransform {
    private labels = inject(DATE_PRESET_LABELS);

    transform(preset: DatePresetKey | null | undefined): string {
        const key = preset ?? DatePresetKey.CUSTOM;
        return this.labels[key] ?? this.labels[DatePresetKey.CUSTOM];
    }
}
