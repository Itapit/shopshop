import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { OrderDocument } from "./orders.schema";
import { OrderDto } from "@common/DTOs/orders/order.dto";
import { mapOrderToDto } from "../order.mapper";
import { OrderBase } from "@common/Interfaces/order.interface";

@Injectable()
export class OrdersRepository {
  constructor(private readonly orderModel: Model<OrderDocument>) {}

    async getPaginatedOrders(
      page: number,
      limit: number,
      sortBy: string
    ): Promise<{ orders: OrderDto[]; totalCount: number }> {
        const skip = (page - 1) * limit; 

        const sort: Record<string, 1 | -1> = {
            [sortBy]: 1,
        }; 

        const [docs, totalCount] = await Promise.all([
            this.orderModel.find().skip(skip).limit(limit).sort(sort).exec(),
            this.orderModel.countDocuments().exec(),
        ]); 

        const orders = docs.map(mapOrderToDto); 
        return { orders, totalCount };

  } 
  
    async findById(id: string): Promise<OrderDocument | null> {
        const doc = await this.orderModel.findById(id).exec();
        return doc ? doc : null;
    } 

    async createOrder(data: OrderBase): Promise<OrderDocument> {
        const order = new this.orderModel(data);
        return order.save();
    }



}
