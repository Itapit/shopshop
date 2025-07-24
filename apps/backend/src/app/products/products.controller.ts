import { Controller, Get, Query } from '@nestjs/common';
import { GetProductsListRequestDTO } from 'common/src/lib/DTOs/products/Get-Products-list-request.dto';
import { ProductsService } from './products.service';
import { GetProductsListResponseDTO } from 'common/src/lib/DTOs/products/Get-Products-list-response.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Get()
    async getProducts(@Query() dto: GetProductsListRequestDTO): Promise<GetProductsListResponseDTO> {
        return this.productService.GetProductsList(dto);
    }

}
