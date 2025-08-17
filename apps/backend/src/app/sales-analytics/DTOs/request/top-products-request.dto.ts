import { IsEnum, Matches, IsOptional} from 'class-validator';
import { SalesMetric} from '@common/Enums/sales-metric.enum';
import { TopProductsRequest } from '@common/Interfaces';

export class TopProductsRequestDto implements TopProductsRequest {
  
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