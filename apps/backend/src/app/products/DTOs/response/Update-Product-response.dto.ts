import { UpdateProductResponse } from '@common/Interfaces';
import { ProductDto } from '../base/product.dto';

export class UpdateProductResponseDto implements UpdateProductResponse {
    product: ProductDto;
    
    constructor(product: ProductDto) {
        this.product = product;
    }
}
