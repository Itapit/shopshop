import { OrderBase } from '@common/Interfaces';
import { PaginationResultDto } from '../DTOs';

export const ORDERS_REPOSITORY = Symbol('ORDERS_REPOSITORY');

export interface IOrdersRepository {
    getPaginatedOrders(page: number, limit: number, sortBy: string): Promise<PaginationResultDto>;

    findById(id: string): Promise<OrderBase | null>;

    createOrder(data: OrderBase): Promise<OrderBase>;

    calculateTotalProfit(): Promise<number>;

    findByCustomerIdPaginated(
        customerId: string,
        page: number,
        limit: number,
        sortBy?: string
    ): Promise<PaginationResultDto>;
}
