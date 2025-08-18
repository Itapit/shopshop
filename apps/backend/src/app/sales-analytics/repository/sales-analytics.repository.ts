import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { OrderDocument } from '../../orders/repository/orders.schema';
import { mapMonthlyQuantity } from '../mappers/monthly-quantity.mapper';
import { ProductDocument } from '../../products/repository/product.schema';
@Injectable()
export class SalesAnalyticsRepository {
    constructor(@InjectModel('Order') private readonly OrderModel: Model<OrderDocument> , @InjectModel('Product') private readonly ProductModel: Model<ProductDocument>) {}

    async fetchMonthlyProductQuantity(
        startUtc: Date,
        endUtc: Date,
        months: string[],
        timezone: string = 'Asia/Jerusalem'
    ): Promise<Array<{ month: string; productId: string; quantity: number }>> {
        const pipeline: PipelineStage[] = [
            { $match: { createdAt: { $gte: startUtc, $lt: endUtc } } },
            { $unwind: { path: '$items' } },
            {
                $project: {
                    productId: '$items.product_id', 
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

        let rows =  await this.OrderModel.aggregate<{ month: string; productId: string; quantity: number }>(pipeline)
            .allowDiskUse(true)
            .exec(); 
        return mapMonthlyQuantity(rows);
    } 

     async fetchMonthlyProductProfit(
    startUtc: Date,                      
    endUtc: Date,                       
    months: string[],               
    timezone: string = 'Asia/Jerusalem', 
  ): Promise<Array<{ month: string; productId: string; profit: number }>> {

    
    const productsColl = this.ProductModel.collection.name;

    const pipeline: PipelineStage[] = [
      
      { $match: { createdAt: { $gte: startUtc, $lt: endUtc } } },

      
      { $unwind: { path: '$items' } },

      
      {
        $project: {
          
          productId: { $ifNull: ['$items.product_id', '$items._id'] },
          quantity:  '$items.quantity',
          month: {
            $dateToString: { format: '%Y-%m', date: '$createdAt', timezone }
          },
        },
      },

      
      {
        $lookup: {
          from: productsColl,
          localField: 'productId',
          foreignField: '_id',
          as: 'prod'
        }
      },
      { $unwind: { path: '$prod', preserveNullAndEmptyArrays: true } },

      
      {
        $addFields: {
          unitPrice: { $ifNull: ['$prod.price', 0] },
          lineProfit: { $multiply: ['$quantity', { $ifNull: ['$prod.price', 0] }] }
        }
      },

      
      {
        $group: {
          _id: { month: '$month', productId: '$productId' },
          profit: { $sum: '$lineProfit' }
        }
      },

      
      {
        $project: {
          _id: 0,
          month: '$_id.month',
          productId: { $toString: '$_id.productId' },
          profit: 1,
        }
      },

      
      { $match: { month: { $in: months } } },

      
      { $sort: { month: 1, productId: 1 } },
    ];

    return this.OrderModel
      .aggregate<{ month: string; productId: string; profit: number }>(pipeline)
      .allowDiskUse(true)
      .exec();
  }

}
