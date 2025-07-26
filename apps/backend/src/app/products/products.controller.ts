import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateProductRequestDto, CreateProductResponseDto, GetProductsListRequestDTO, GetProductsListResponseDTO } from '@common/DTOs';
import { Role } from '@common/Enums';

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
