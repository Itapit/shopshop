import { CartBase } from '../base';

export interface ClearCartResponse extends CartBase {
    customer_id: string;
    items: [];
}
