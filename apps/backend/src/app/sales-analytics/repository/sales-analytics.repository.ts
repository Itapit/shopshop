import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { OrderDocument } from '../../orders/repository/orders.schema';
@Injectable()
export class SalesAnalyticsRepository {
    constructor(@InjectModel('Order') private readonly OrderModel: Model<OrderDocument>) {}

    async fetchMonthlyProductQuantity(params: {
        fromYYYYMM: string;
        toYYYYMM: string;
        timezone: string;
    }): Promise<Array<{ month: string; productId: string; qty: number }>> {
        const months = this.buildMonthList(params.fromYYYYMM, params.toYYYYMM);
        if (!months.length) return [];

        const start = this.monthStart(months[0]);
        const end = this.monthStart(this.addOneMonth(months.at(-1)!));

        const pipeline: PipelineStage[] = [
            { $match: { createdAt: { $gte: start, $lt: end } } },
            { $unwind: { path: '$items' } }, 
            {
                $project: {
                    productId: '$items.product_id',
                    qty: '$items.quantity',
                    month: {
                        $dateToString: {
                            format: '%Y-%m',
                            date: '$createdAt',
                            timezone: params.timezone,
                        },
                    },
                },
            },
            {
                $group: {
                    _id: { month: '$month', productId: '$productId' },
                    qty: { $sum: '$qty' },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: '$_id.month',
                    productId: { $toString: '$_id.productId' },
                    qty: 1,
                },
            },
            { $match: { month: { $in: months } } }, // safety
            { $sort: { month: 1, productId: 1 } },
        ];

        return this.OrderModel.aggregate<{ month: string; productId: string; qty: number }>(pipeline) // <- generic result type
            .allowDiskUse(true)
            .exec();
    }
    private monthStart(yyyyMM: string): Date {
        const [y, m] = yyyyMM.split('-').map(Number);
        return new Date(Date.UTC(y, m - 1, 1, 0, 0, 0));
    }
    private addOneMonth(yyyyMM: string): string {
        const [y, m] = yyyyMM.split('-').map(Number);
        const ny = m === 12 ? y + 1 : y;
        const nm = m === 12 ? 1 : m + 1;
        return `${ny}-${String(nm).padStart(2, '0')}`;
    }
    private buildMonthList(from: string, to: string): string[] {
        const [fy, fm] = from.split('-').map(Number);
        const [ty, tm] = to.split('-').map(Number);
        const out: string[] = [];
        let y = fy,
            m = fm;
        while (y < ty || (y === ty && m <= tm)) {
            out.push(`${y}-${String(m).padStart(2, '0')}`);
            m++;
            if (m === 13) {
                m = 1;
                y++;
            }
        }
        return out;
    }
}
