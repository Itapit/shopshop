import { ProductSortBy } from '@common/Enums';
import { GetProductsListRequest } from '@common/Interfaces';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetProductsListRequestDTO implements Partial<GetProductsListRequest> {
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

    @IsOptional()
    @IsString()
    keyword?: string;
}
