import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProductBase } from "common/src/lib/Interfaces/product.interface";
import { Document } from 'mongoose';

export type ProductDocument = ProductSchema & Document;

@Schema({ collection: 'products',timestamps: true })
export class ProductSchema implements ProductBase{
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ default: 0 })
    quantity: number;

    @Prop()
    imageUrl: string;
}

export const ProductSchemaFactory = SchemaFactory.createForClass(ProductSchema);