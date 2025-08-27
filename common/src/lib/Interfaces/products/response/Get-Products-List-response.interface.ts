import { ProductFull } from '../base/product-full.interface';

export interface GetProductsListResponse {
    products: ProductFull[];
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
}
