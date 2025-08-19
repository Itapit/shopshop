import { GetProductsListResponse } from '@common/Interfaces';
import { ProductDto } from '../base/product.dto';

export class GetProductsListResponseDTO implements GetProductsListResponse {
    products!: ProductDto[];
    page!: number;
    limit!: number;
    totalCount!: number;
    totalPages!: number;
}
