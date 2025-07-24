import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";
import { ProductSortBy } from "../../Enums/sort-by.enum";

export class GetProductsListRequestDTO {
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @IsEnum(ProductSortBy)
    sortBy?: ProductSortBy;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(100)
    limit?: number = 10;
}