import { CandleInterval } from '@common/Enums';
import { SalesStatsRequest } from '@common/Interfaces';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DateRangeStrDto } from '../base';

export class SalesStatsRequestDto implements SalesStatsRequest {
    @ValidateNested()
    @Type(() => DateRangeStrDto)
    dateRange: DateRangeStrDto;

    @IsEnum(CandleInterval)
    candleInterval: CandleInterval;

    @IsOptional()
    @IsString()
    timezone?: string;
}
