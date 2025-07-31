import { ProductSortBy } from "@common/Enums";

export interface GetProductsListRequest {
    page:number,
    sortBy?: ProductSortBy
    limit?:number
    keyword?:string
}