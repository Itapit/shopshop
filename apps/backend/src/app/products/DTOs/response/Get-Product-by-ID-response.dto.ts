import { GetProductByIdResponse } from '@common/Interfaces';
import { ProductDto } from '../base/product.dto';

export class GetProductByIdResponseDto implements GetProductByIdResponse {
    product: ProductDto;

    constructor(product: ProductDto) {
        this.product = product;
    }
}
