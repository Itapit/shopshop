import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductsRepository, PRODUCTS_REPOSITORY } from './repository/products-repository.interface';
import { GetProductsListRequestDTO } from './DTOs/request/Get-Products-list-request.dto';
import { GetProductsListResponseDTO } from './DTOs/response/Get-Products-list-response.dto';
import { CreateProductRequestDto } from './DTOs/request/Create-Product-request.dto';
import { CreateProductResponseDto } from './DTOs/response/Create-Product-response.dto';
import { GetProductByIdResponseDto } from './DTOs/response/Get-Product-by-ID-response.dto';
import { UpdateProductRequestDto } from './DTOs/request/Update-Product-request.dto';
import { UpdateProductResponseDto } from './DTOs/response/Update-Product-response.dto';
//TODO fix the dto imports
@Injectable()
export class ProductsService {
    constructor(
        @Inject(PRODUCTS_REPOSITORY)
        private readonly productsRepo: IProductsRepository
    ) {}

    async GetProductsList(dto: GetProductsListRequestDTO): Promise<GetProductsListResponseDTO> {
        const { page = 1, limit = 10, sortBy } = dto; 
        const { products, totalCount } = dto.keyword
            ? await this.productsRepo.findByNameContains(dto.keyword, page, limit, sortBy)
            : await this.productsRepo.getPaginatedProducts(page, limit, sortBy);
        if (!products || products.length === 0) {
            throw new NotFoundException('No products found');
        }    

        const response = new GetProductsListResponseDTO();
        response.products = products;
        response.page = page;
        response.limit = limit;
        response.totalCount = totalCount;
        response.totalPages = Math.ceil(totalCount / limit);

        return response;
    }

    async CreateProduct(dto: CreateProductRequestDto): Promise<CreateProductResponseDto> {
        const created = await this.productsRepo.create(dto);
        return new CreateProductResponseDto(created);
    }

    async GetProductById(id: string ) : Promise<GetProductByIdResponseDto> {
        const product = await this.productsRepo.findById(id)
        return new GetProductByIdResponseDto(product);
    }
    
    async DeleteProductById(id: string) : Promise<void>{
        const deleted = await this.productsRepo.deleteById(id)
        if (!deleted) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
    }
    
    async updateProduct(id: string, dto: UpdateProductRequestDto): Promise<UpdateProductResponseDto> {
        const updated = await this.productsRepo.updateById(id, dto);
        if (!updated) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return new UpdateProductResponseDto(updated);
    } 

    async findByNameContains(dto: GetProductsListRequestDTO): Promise<GetProductsListResponseDTO>{
        const { keyword, page = 1, limit = 10, sortBy } = dto;
        const { products, totalCount } = await this.productsRepo.findByNameContains(keyword, page, limit, sortBy);

        const response = new GetProductsListResponseDTO();
        response.data = products;
        response.page = page;
        response.limit = limit;
        response.totalCount = totalCount;
        response.totalPages = Math.ceil(totalCount / limit);

        return response;
    }  
        
        
}

