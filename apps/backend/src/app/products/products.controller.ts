import { Controller, Get, Query } from '@nestjs/common';
import { GetProductsListDTO } from 'common/src/lib/DTOs/Get-Products-list.dto';
import { ProductsService } from './products.service';
import { GetProductsListResponseDTO } from 'common/src/lib/DTOs/Get-Products-list-response.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Get()
    async getProducts(@Query() dto: GetProductsListDTO): Promise<GetProductsListResponseDTO> {
        return this.productService.GetProductsList(dto);
    }

}
