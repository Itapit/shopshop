import { OrdersSortBy } from "@common/Enums/orders-sort-by";
import { GetOrdersListRequest } from "@common/Interfaces";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class GetOrdersListRequestDto implements GetOrdersListRequest  {
    @IsString()
    customerId!: string;
        
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;
    
    @IsOptional()
    @IsEnum(OrdersSortBy)
    sortBy?: OrdersSortBy;
    
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(100)
    limit?: number = 10; 
}
