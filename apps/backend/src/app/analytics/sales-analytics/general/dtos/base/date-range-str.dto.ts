import { DateRangeStr } from '@common/Interfaces';
import { IsISO8601 } from 'class-validator';

export class DateRangeStrDto implements DateRangeStr {
    @IsISO8601({ strict: true }, { message: 'start must be ISO8601' })
    start!: string;

    @IsISO8601({ strict: true }, { message: 'end must be ISO8601' })
    end!: string;
}
