import { OrderFull } from "../base";

export interface GetOrdersListResponse{
    orders: OrderFull[];
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
}