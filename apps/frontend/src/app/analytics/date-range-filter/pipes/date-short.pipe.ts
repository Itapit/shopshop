import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateShort',
    pure: true,
})
export class DateShortPipe implements PipeTransform {
    constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}

    transform(
        value: Date | string | number | null | undefined,
        options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' },
        locale?: string
    ): string {
        if (value == null) return '';
        const d = new Date(value);
        if (isNaN(d.getTime())) return '';
        const fmt = new Intl.DateTimeFormat(locale ?? this.defaultLocale, options);
        return fmt.format(d);
    }
}
