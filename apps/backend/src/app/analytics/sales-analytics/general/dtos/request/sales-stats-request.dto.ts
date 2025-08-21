import { CandleInterval } from '@common/Enums';
import { DateRangeStr, SalesStatsRequest } from '@common/Interfaces';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DateRangeStrDto } from '../base';

export class SalesStatsRequestDto implements SalesStatsRequest {
    @Type(() => DateRangeStrDto)
    dateRange: DateRangeStr;

    @IsEnum(CandleInterval)
    candleInterval: CandleInterval;

    @IsOptional()
    @IsString()
    timezone?: string;
}
