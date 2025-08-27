import { SalesMetric } from '@common/Enums/sales-metric.enum';

export interface TopProductsRequest {
    metric: SalesMetric;
    from: string;
    to: string;
    k?: number;
}
