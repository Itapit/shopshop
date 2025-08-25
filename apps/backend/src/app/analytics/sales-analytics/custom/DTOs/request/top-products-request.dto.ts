import { SalesMetric } from '@common/Enums/sales-metric.enum';
import { TopProductsQuantityRequest } from '@common/Interfaces';
import { IsEnum, IsOptional, Matches } from 'class-validator';

export class TopProductsQuantityRequestDto implements TopProductsQuantityRequest {
    //TODO use the date range str dto

    @IsEnum(SalesMetric, { message: 'metric must be "quantity" or "profit"' })
    metric!: SalesMetric;

    @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, { message: 'from must be YYYY-MM' })
    from!: string;

    @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, { message: 'to must be YYYY-MM' })
    to!: string;

    @IsOptional()
    @Matches(/^\d+$/)
    k?: string;
}
