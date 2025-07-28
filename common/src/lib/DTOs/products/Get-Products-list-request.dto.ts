import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";
import { Type } from "class-transformer";
import { ProductSortBy } from "../../Enums/sort-by.enum";

export class GetProductsListRequestDTO {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @IsEnum(ProductSortBy)
    sortBy?: ProductSortBy;
    
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(100)
    limit?: number = 10; 

    @IsOptional()
    keyword?: string;
}


