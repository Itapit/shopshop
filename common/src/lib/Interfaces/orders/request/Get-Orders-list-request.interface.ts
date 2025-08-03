import { OrdersSortBy } from "@common/Enums/orders-sort-by"

export interface GetOrdersListRequest{
    customer_id: string,
    page:number,
    sort_by?: OrdersSortBy
    limit?:number
}