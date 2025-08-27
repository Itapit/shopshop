import { UpdateProductRequest } from '@common/Interfaces';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProductRequestDto implements UpdateProductRequest {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    quantity?: number;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}
