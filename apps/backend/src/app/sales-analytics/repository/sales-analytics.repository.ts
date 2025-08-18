import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { OrderDocument } from '../../orders/repository/orders.schema';
import { ProductDocument } from '../../products/repository/product.schema';
import { MonthlyProfitDto, MonthlyQuantityDto } from '../DTOs/base';
import { mapMonthlyProfit } from '../mappers/monthly-profit.mapper';
import { mapMonthlyQuantity } from '../mappers/monthly-quantity.mapper';
@Injectable()
export class SalesAnalyticsRepository {
    constructor(
        @InjectModel('Order') private readonly OrderModel: Model<OrderDocument>,
        @InjectModel('Product') private readonly ProductModel: Model<ProductDocument>
    ) {}

    async fetchMonthlyProductQuantity(
        startUtc: Date,
        endUtc: Date,
        months: string[],
        timezone: string = 'Asia/Jerusalem'
    ): Promise<MonthlyQuantityDto[]> {
        const pipeline: PipelineStage[] = [
            { $match: { createdAt: { $gte: startUtc, $lt: endUtc } } },
            { $unwind: { path: '$items' } },
            {
                $project: {
                    productId: { $ifNull: ['$items.product_id', '$items._id'] },
                    quantity: '$items.quantity',
                    month: {
                        $dateToString: {
                            format: '%Y-%m',
                            date: '$createdAt',
                            timezone,
                        },
                    },
                },
            },
            {
                $group: {
                    _id: { month: '$month', productId: '$productId' },
                    quantity: { $sum: '$quantity' },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: '$_id.month',
                    productId: { $toString: '$_id.productId' },
                    quantity: 1,
                },
            },
            { $match: { month: { $in: months } } },
            { $sort: { month: 1, productId: 1 } },
        ];

        let rows = await this.OrderModel.aggregate<{ month: string; productId: string; quantity: number }>(pipeline)
            .allowDiskUse(true)
            .exec();
        return mapMonthlyQuantity(rows);
    }

    async fetchMonthlyProductProfit(
        startUtc: Date,
        endUtc: Date,
        months: string[],
        timezone: string = 'Asia/Jerusalem'
    ): Promise<MonthlyProfitDto[]> {
        const productsColl = this.ProductModel.collection.name;

        const pipeline: PipelineStage[] = [
            { $match: { createdAt: { $gte: startUtc, $lt: endUtc } } },
            { $unwind: { path: '$items' } },

            // 1) Project a raw id (could be string or ObjectId) + qty + month label
            {
                $project: {
                    productIdRaw: { $ifNull: ['$items.product_id', '$items._id'] },
                    quantity: '$items.quantity',
                    month: {
                        $dateToString: { format: '%Y-%m', date: '$createdAt', timezone },
                    },
                },
            },

            // 2) Normalize to ObjectId for lookup (if it's a string, cast it)
            {
                $addFields: {
                    productIdObj: {
                        $cond: [
                            { $eq: [{ $type: '$productIdRaw' }, 'string'] },
                            { $toObjectId: '$productIdRaw' },
                            '$productIdRaw',
                        ],
                    },
                },
            },

            // 3) Lookup product by _id (now an ObjectId)
            {
                $lookup: {
                    from: productsColl,
                    localField: 'productIdObj',
                    foreignField: '_id',
                    as: 'prod',
                },
            },
            { $unwind: { path: '$prod', preserveNullAndEmptyArrays: true } },

            // 4) Compute line profit
            {
                $addFields: {
                    unitPrice: { $ifNull: ['$prod.price', 0] },
                    lineProfit: { $multiply: ['$quantity', { $ifNull: ['$prod.price', 0] }] },
                },
            },

            // 5) Group by (month, product)
            {
                $group: {
                    _id: { month: '$month', productId: '$productIdObj' },
                    profit: { $sum: '$lineProfit' },
                },
            },

            // 6) Final shape (productId as string)
            {
                $project: {
                    _id: 0,
                    month: '$_id.month',
                    productId: { $toString: '$_id.productId' },
                    profit: 1,
                },
            },

            { $match: { month: { $in: months } } },
            { $sort: { month: 1, productId: 1 } },
        ];

        const rows = await this.OrderModel.aggregate<{ month: string; productId: string; profit: number }>(pipeline)
            .allowDiskUse(true)
            .exec();

        return mapMonthlyProfit(rows);
    }
}
