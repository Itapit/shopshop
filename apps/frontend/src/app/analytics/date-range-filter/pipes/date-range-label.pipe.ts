import { Inject, LOCALE_ID, Pipe, PipeTransform, inject } from '@angular/core';
import { DatePresetKey } from '../enums';
import { DateRange } from '../interfaces';
import { DATE_PRESET_LABELS } from '../services/date-preset-labels.token';

export interface DateRangeLabelOptions {
    showPreset?: boolean; // default: true
    arrow?: string; // default: ' -> '
    locale?: string; // default: LOCALE_ID
    format?: Intl.DateTimeFormatOptions; // default: { year:'numeric', month:'short', day:'2-digit' }
}

@Pipe({
    name: 'dateRangeLabel',
    standalone: true,
    pure: true,
})
export class DateRangeLabelPipe implements PipeTransform {
    constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
    private labels = inject(DATE_PRESET_LABELS);

    private fmt(value: Date | string | number, options: Intl.DateTimeFormatOptions, locale: string): string {
        const d = new Date(value);
        const fmt = new Intl.DateTimeFormat(locale, options);
        return fmt.format(d);
    }

    transform(
        range: DateRange | null | undefined,
        preset?: DatePresetKey | null,
        options?: DateRangeLabelOptions
    ): string {
        if (!range) return 'No range';

        const arrow = options?.arrow ?? ' -> ';
        const locale = options?.locale ?? this.defaultLocale;
        const format = options?.format ?? { year: 'numeric', month: 'short', day: '2-digit' };

        const start = this.fmt(range.start, format, locale);
        const end = this.fmt(range.end, format, locale);
        const core = `${start}${arrow}${end}`;

        if (options?.showPreset === false) return core;

        const key = preset ?? DatePresetKey.CUSTOM;
        const label = this.labels[key] ?? this.labels[DatePresetKey.CUSTOM];
        return `${label} (${core})`;
    }
}
