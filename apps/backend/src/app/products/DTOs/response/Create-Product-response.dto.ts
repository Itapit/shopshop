import { CreateProductResponse, ProductFull } from "@common/Interfaces";
import { ProductDto } from "../base/product.dto";

export class CreateProductResponseDto implements CreateProductResponse {
    product: ProductDto;
    
    constructor(product: ProductDto) {
        this.product = product;
    }
}