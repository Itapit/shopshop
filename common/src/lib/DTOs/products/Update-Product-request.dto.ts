import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateProductRequestDto {
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