import { SalesMetric } from "@common/Enums/sales-metric.enum";

export interface TopProductsQuantityRequest {
    metric: SalesMetric;
    from: string;
    to: string;
    k?: number;
}