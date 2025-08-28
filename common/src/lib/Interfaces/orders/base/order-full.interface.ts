import { OrderBase } from './order-base.interface';

export interface OrderFull extends OrderBase {
    order_id: string;
    created_at: string;
}
