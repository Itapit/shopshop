import { OrderBase } from "./Order-Base.interface";

export interface OrderFull extends OrderBase{
    orderID:string
    createdAt:string
}