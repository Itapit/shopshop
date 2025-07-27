import { ProductDto } from "./product.dto";

export class CreateProductResponseDto extends ProductDto {
    constructor(partial: ProductDto) {super();
        Object.assign(this, partial);
    }
}