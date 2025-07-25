import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GetProductsListRequestDTO } from 'common/src/lib/DTOs/products/Get-Products-list-request.dto';
import { ProductsService } from './products.service';
import { GetProductsListResponseDTO } from 'common/src/lib/DTOs/products/Get-Products-list-response.dto';
import { CreateProductRequestDto } from 'common/src/lib/DTOs/products/Create-Product-request.dto'
import { CreateProductResponseDto } from 'common/src/lib/DTOs/products/Create-Product-response.dto'
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from 'common/src/lib/Enums/role.enum';
import { Roles } from '../auth/roles.decorator';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Get()
    async getProducts(@Query() dto: GetProductsListRequestDTO): Promise<GetProductsListResponseDTO> {
        return this.productService.GetProductsList(dto);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    async createProduct(@Body() dto: CreateProductRequestDto) : Promise<CreateProductResponseDto> {
        return this.productService.CreateProduct(dto);
    }

}
