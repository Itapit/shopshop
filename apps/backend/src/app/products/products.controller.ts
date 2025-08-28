import { Role } from '@common/Enums';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
    CreateProductRequestDto,
    CreateProductResponseDto,
    GetProductByIdResponseDto,
    GetProductsListRequestDTO,
    GetProductsListResponseDTO,
    UpdateProductRequestDto,
    UpdateProductResponseDto,
} from './DTOs';
import { ProductsService } from './products.service';

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
    async createProduct(@Body() dto: CreateProductRequestDto): Promise<CreateProductResponseDto> {
        return this.productService.CreateProduct(dto);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<GetProductByIdResponseDto> {
        return this.productService.GetProductById(id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(':id')
    async deleteProductById(@Param('id') id: string): Promise<{ message: string }> {
        await this.productService.DeleteProductById(id);
        return { message: `Product ${id} deleted successfully.` };
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Put(':id')
    async editProductById(
        @Param('id') id: string,
        @Body() dto: UpdateProductRequestDto
    ): Promise<UpdateProductResponseDto> {
        return this.productService.updateProduct(id, dto);
    }
}
