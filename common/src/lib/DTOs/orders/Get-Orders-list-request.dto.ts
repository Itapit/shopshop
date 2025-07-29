import { OrdersSortBy } from "@common/Enums/orders-sort-by";
import { OrderBase } from "@common/Interfaces/order.interface";
import { ProductItem } from "@common/Interfaces/product-item.interface";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";

export class GetOrdersListRequestDto  {
        customer_id!: string;
        @IsOptional()
        @Type(() => Number)
        @IsInt()
        @Min(1)
        page?: number = 1;
    
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