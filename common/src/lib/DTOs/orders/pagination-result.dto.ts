import { OrderDto } from "./order.dto";

export class PaginationResultDto {
    items: OrderDto[];
    totalCount: number;
    
    constructor(items: OrderDto[], totalCount: number) {
        this.items = items;
        this.totalCount = totalCount;
        
    }
}