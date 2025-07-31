import { ProductFull } from "@common/Interfaces";

export class ProductDto implements ProductFull{
    name!: string;
    description!: string;
    price!: number;
    quantity!:number;    
    imageUrl!: string;
    productID!: string;
}