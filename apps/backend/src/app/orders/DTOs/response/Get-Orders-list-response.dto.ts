import { GetOrdersListResponse, OrderBase } from '@common/Interfaces';

export class GetOrdersListResponseDTO implements GetOrdersListResponse {
    orders: OrderBase[];
    page!: number;
    limit!: number;
    totalCount!: number;
    totalPages!: number;
}
