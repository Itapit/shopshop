import { Inject, Injectable } from '@nestjs/common';
import { IProductsRepository, PRODUCTS_REPOSITORY } from './repository/products-repository.interface';
import { mapToProductDto } from './product.mapper';
import { CreateProductRequestDto, CreateProductResponseDto, GetProductsListRequestDTO, GetProductsListResponseDTO, ProductDto } from '@common/DTOs';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(PRODUCTS_REPOSITORY)
        private readonly productsRepo: IProductsRepository
    ) {}

    async GetProductsList(dto: GetProductsListRequestDTO): Promise<GetProductsListResponseDTO> {
        const { page = 1, limit = 10, sortBy } = dto;

        const { products, totalCount } = await this.productsRepo.getPaginatedProducts(page, limit, sortBy);

        const productDtos: ProductDto[] = products.map(mapToProductDto);

        const response = new GetProductsListResponseDTO();
        response.data = productDtos;
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
}
