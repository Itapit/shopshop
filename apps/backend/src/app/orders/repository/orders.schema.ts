import { OrderBase, ProductItem } from "@common/Interfaces";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type OrderDocument = OrderSchema & Document;

@Schema({ collection: 'orders', timestamps: true })
export class OrderSchema implements OrderBase {
    @Prop({ required: true })
    customerID: string;

    @Prop({ type: [{ product_id: String, quantity: Number }], required: true })
    items: ProductItem[];

    @Prop({ required: true })
    totalPrice: number;
} 
export const OrderSchemaFactory = SchemaFactory.createForClass(OrderSchema);