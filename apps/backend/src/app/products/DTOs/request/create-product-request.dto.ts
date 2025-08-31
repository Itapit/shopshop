import { CreateProductRequest } from '@common/Interfaces';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductRequestDto implements CreateProductRequest {
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
    imageUrl!: string;
}
