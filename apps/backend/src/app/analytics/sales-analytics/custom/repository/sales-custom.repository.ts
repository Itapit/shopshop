import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { OrderDocument } from '../../../../orders/repository/orders.schema';
import { ProductDocument } from '../../../../products/repository/product.schema';
import { mapMonthlyProfit } from '../mappers/monthly-profit.mapper';
import { mapMonthlyQuantity } from '../mappers/monthly-quantity.mapper';
import { buildTopKProfitPipeline, buildTopKQuantityPipeline } from './pipes';

@Injectable()
export class SalesCustomAnalyticsRepository {
    constructor(
        @InjectModel('Order') private readonly OrderModel: Model<OrderDocument>,
        @InjectModel('Product') private readonly ProductModel: Model<ProductDocument>
    ) {}

    async fetchMonthlyProductQuantity(
        startUtc: Date,
        endUtc: Date,
        months: string[],
        timezone : string,
        k = 5
    ) {
        const pipeline: PipelineStage[] = buildTopKQuantityPipeline({ startUtc, endUtc, months, timezone, k });
        const rows = await this.OrderModel.aggregate<{ month: string; productId: string; quantity: number }>(pipeline)
            .allowDiskUse(true)
            .exec();
        return mapMonthlyQuantity(rows);
    }

    async fetchMonthlyProductProfit(
        startUtc: Date,
        endUtc: Date,
        months: string[],
        timezone : string,
        k = 5
    ) {
        const productsColl = this.ProductModel.collection.name;
        const pipeline: PipelineStage[] = buildTopKProfitPipeline(productsColl)({
            startUtc,
            endUtc,
            months,
            timezone,
            k,
        });
        const rows = await this.OrderModel.aggregate<{ month: string; productId: string; profit: number }>(pipeline)
            .allowDiskUse(true)
            .exec();
        return mapMonthlyProfit(rows);
    }
}
