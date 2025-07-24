import { ProductBase } from "../../Interfaces/product.interface";

export class ProductDto implements ProductBase{
    name!: string;
    description!: string;
    price!: number;
    quantity!:number;
    imageUrl!: string;
}