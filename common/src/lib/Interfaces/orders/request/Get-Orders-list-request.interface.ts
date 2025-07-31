import { OrdersSortBy } from "@common/Enums/orders-sort-by"

export interface GetOrdersListRequest{
    customerId: string,
    page:number,
    sortBy?: OrdersSortBy
    limit?:number
}