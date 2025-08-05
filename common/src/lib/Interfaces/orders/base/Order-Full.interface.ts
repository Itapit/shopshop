import { OrderBase } from './Order-Base.interface';

export interface OrderFull extends OrderBase {
    order_id: string;
    created_at: string;
}
