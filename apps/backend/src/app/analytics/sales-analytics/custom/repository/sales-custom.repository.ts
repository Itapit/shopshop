import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { OrderDocument } from '../../../../orders/repository/orders.schema';
import { ProductDocument } from '../../../../products/repository/product.schema';
import { MonthlyProfitDto, MonthlyQuantityDto } from '../DTOs/base';
import { mapMonthlyProfit } from '../mappers/monthly-profit.mapper';
import { mapMonthlyQuantity } from '../mappers/monthly-quantity.mapper';

@Injectable()
export class SalesCustomAnalyticsRepository {
    // TODO: split the pipes into separates file within a pipes folder
    // TODO: move the timezone so it wont be hardcoded , can have a it as default
    constructor(
        @InjectModel('Order') private readonly OrderModel: Model<OrderDocument>,
        @InjectModel('Product') private readonly ProductModel: Model<ProductDocument>
    ) {}

    async fetchMonthlyProductQuantity(
        startUtc: Date,
        endUtc: Date,
        months: string[],
        timezone: string = 'Asia/Jerusalem',
        k: number = 5
    ): Promise<MonthlyQuantityDto[]> {
        const pipeline: PipelineStage[] = [
            { $match: { createdAt: { $gte: startUtc, $lt: endUtc } } },
            { $unwind: '$items' },

            {
                $project: {
                    productIdRaw: {
                        $ifNull: [
                            '$items.productID',
                            { $ifNull: ['$items.productId', { $ifNull: ['$items.product_id', '$items._id'] }] },
                        ],
                    },
                    quantity: '$items.quantity',
                    month: { $dateToString: { format: '%Y-%m', date: '$createdAt', timezone } },
                },
            },

            {
                $addFields: {
                    productKey: {
                        $cond: [
                            { $eq: [{ $type: '$productIdRaw' }, 'objectId'] },
                            { $toString: '$productIdRaw' },
                            '$productIdRaw',
                        ],
                    },
                },
            },
            { $match: { productKey: { $ne: null } } },

            {
                $group: {
                    _id: { month: '$month', productId: '$productKey' },
                    quantity: { $sum: '$quantity' },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: '$_id.month',
                    productId: '$_id.productId',
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
        timezone = 'Asia/Jerusalem'
    ): Promise<MonthlyProfitDto[]> {
        const productsColl = this.ProductModel.collection.name;

        const pipeline: PipelineStage[] = [
            { $match: { createdAt: { $gte: startUtc, $lt: endUtc } } },
            { $unwind: '$items' },

            {
                $project: {
                    productIdRaw: {
                        $ifNull: [
                            '$items.productID',
                            { $ifNull: ['$items.productId', { $ifNull: ['$items.product_id', '$items._id'] }] },
                        ],
                    },
                    quantity: '$items.quantity',
                    month: { $dateToString: { format: '%Y-%m', date: '$createdAt', timezone } },
                },
            },

            {
                $addFields: {
                    productIdObj: {
                        $switch: {
                            branches: [
                                { case: { $eq: [{ $type: '$productIdRaw' }, 'objectId'] }, then: '$productIdRaw' },
                                {
                                    case: {
                                        $and: [
                                            { $eq: [{ $type: '$productIdRaw' }, 'string'] },
                                            { $regexMatch: { input: '$productIdRaw', regex: /^[0-9a-fA-F]{24}$/ } },
                                        ],
                                    },
                                    then: { $toObjectId: '$productIdRaw' },
                                },
                            ],
                            default: null,
                        },
                    },
                },
            },
            { $match: { productIdObj: { $ne: null } } },

            {
                $lookup: {
                    from: productsColl,
                    localField: 'productIdObj',
                    foreignField: '_id',
                    as: 'prod',
                },
            },
            { $unwind: { path: '$prod', preserveNullAndEmptyArrays: true } },

            {
                $addFields: {
                    unitPrice: {
                        $cond: [
                            { $in: [{ $type: '$prod.price' }, ['double', 'int', 'long', 'decimal']] },
                            '$prod.price',
                            { $toDouble: { $ifNull: ['$prod.price', 0] } },
                        ],
                    },
                },
            },
            { $addFields: { lineProfit: { $multiply: ['$quantity', '$unitPrice'] } } },

            {
                $group: {
                    _id: { month: '$month', productId: '$productIdObj' },
                    profit: { $sum: '$lineProfit' },
                },
            },

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
