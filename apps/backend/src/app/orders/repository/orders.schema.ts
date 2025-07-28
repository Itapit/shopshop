import { Prop, Schema } from "@nestjs/mongoose";
import { ProductItem} from "@common/Interfaces/product-item.interface";
import { OrderBase } from "@common/Interfaces/order.interface";
export type OrderDocument = OrderSchema & Document;

@Schema({ collection: 'orders', timestamps: true })
export class OrderSchema implements OrderBase {
    @Prop({ required: true })
    customer_id: string;

    @Prop({ type: [{ product_id: String, quantity: Number }], required: true })
    items: ProductItem[];

    @Prop({ required: true })
    total_price: number;
}