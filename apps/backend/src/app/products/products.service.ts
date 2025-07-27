import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductsRepository, PRODUCTS_REPOSITORY } from './repository/products-repository.interface';
import { CreateProductRequestDto, CreateProductResponseDto, GetProductByIdResponseDto, GetProductsListRequestDTO, GetProductsListResponseDTO } from '@common/DTOs';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(PRODUCTS_REPOSITORY)
        private readonly productsRepo: IProductsRepository
    ) {}

    async GetProductsList(dto: GetProductsListRequestDTO): Promise<GetProductsListResponseDTO> {
        const { page = 1, limit = 10, sortBy } = dto;
        const { products, totalCount } = await this.productsRepo.getPaginatedProducts(page, limit, sortBy);

        const response = new GetProductsListResponseDTO();
        response.data = products;
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
}
