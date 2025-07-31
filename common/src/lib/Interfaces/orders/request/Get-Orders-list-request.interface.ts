import { OrdersSortBy } from "@common/Enums/orders-sort-by"

export interface GetOrdersListRequest{
    page:number,
    sortBy?: OrdersSortBy
    limit?:number
}