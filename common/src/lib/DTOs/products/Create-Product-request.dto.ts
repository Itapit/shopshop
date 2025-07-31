import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ProductBase } from "../../Interfaces/product.interface";

export class CreateProductRequestDto implements ProductBase {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsNumber()
    @Min(0)
    quantity!: number;

    @IsString()
    @IsOptional()
    imageUrl!: string;
}