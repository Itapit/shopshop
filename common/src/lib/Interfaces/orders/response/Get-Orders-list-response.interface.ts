import { OrderBase } from '../base';

export interface GetOrdersListResponse {
    orders: OrderBase[];
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
}
