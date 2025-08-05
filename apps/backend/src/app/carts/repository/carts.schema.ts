import { Type } from "class-transformer";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CartBase } from "@common/Interfaces/carts";
import { ProductItem } from "@common/Interfaces/";

export type CartDocument = CartSchema & Document;

@Schema({ collection: 'carts', timestamps: true })
export class CartSchema implements CartBase {
    
    @Prop({ required: true })
    customer_id: string;

    @Prop({ type: [{ productID: String, quantity: Number }], required: true })
    items: ProductItem[];
  
} 
export const CartSchemaFactory = SchemaFactory.createForClass(CartSchema);
