import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@common/Enums';
import { isValidObjectId } from 'mongoose';
import {
    CreateProductRequestDto,
    CreateProductResponseDto,
    GetProductByIdResponseDto,
    GetProductsListRequestDTO,
    GetProductsListResponseDTO,
    UpdateProductRequestDto,
    UpdateProductResponseDto,
} from './DTOs';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Get()
    async getProducts(
        @Query() dto: GetProductsListRequestDTO
    ): Promise<GetProductsListResponseDTO> {
        return this.productService.GetProductsList(dto);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    async createProduct(
        @Body() dto: CreateProductRequestDto
    ): Promise<CreateProductResponseDto> {
        return this.productService.CreateProduct(dto);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getProductById(
        @Param('id') id: string
    ): Promise<GetProductByIdResponseDto> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException(`Invalid ObjectId: ${id}`);
        }
        return this.productService.GetProductById(id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(':id')
    async deleteProductById(
        @Param('id') id: string
    ): Promise<{ message: string }> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException(`Invalid ObjectId: ${id}`);
        }
        await this.productService.DeleteProductById(id);
        return { message: `Product ${id} deleted successfully.` };
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Put(':id') //TODO figure out why the product json returns without the update
    async editProductById(
        @Param('id') id: string,
        @Body() dto: UpdateProductRequestDto
    ): Promise<UpdateProductResponseDto> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException(`Invalid ObjectId: ${id}`);
        }
        return this.productService.updateProduct(id, dto);
    }
}
