import { OrderFull, ProductItem } from '@common/Interfaces';

export class OrderFullDto implements OrderFull {
    order_id: string;
    customer_id: string;
    items!: ProductItem[];
    total_price: number;
    created_at: string;
}
