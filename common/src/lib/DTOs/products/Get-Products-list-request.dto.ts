import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";
import { ProductSortBy } from "../../Enums/sort-by.enum";
import { Type } from 'class-transformer';

export class GetProductsListRequestDTO {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @IsEnum(ProductSortBy)
    sortBy?: ProductSortBy;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;
}