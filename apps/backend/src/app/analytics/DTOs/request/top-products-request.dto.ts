import { SalesMetric } from '@common/Enums/sales-metric.enum';
import { TopProductsQuantityRequest } from '@common/Interfaces';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Matches, Max, Min } from 'class-validator';

export class TopProductsQuantityRequestDto implements TopProductsQuantityRequest {
    @IsEnum(SalesMetric, { message: 'metric must be "quantity" or "profit"' })
    metric!: SalesMetric;

    @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, { message: 'from must be YYYY-MM' })
    from!: string;

    @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, { message: 'to must be YYYY-MM' })
    to!: string;

    @IsOptional()
    @Type(() => Number) 
    @IsInt()
    @Min(1)
    @Max(20) 
    k?: number;
}
