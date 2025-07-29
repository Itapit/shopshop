import { ProductBase } from "@common/Interfaces";
import { ProductDto } from "../DTOs/base/product.dto";

export const PRODUCTS_REPOSITORY = Symbol('PRODUCTS_REPOSITORY');

export interface IProductsRepository {
  getPaginatedProducts(
    page: number,
    limit: number,
    sortBy: string
  ): Promise<{
    products: ProductDto[];
    totalCount: number;
  }>;

  findById(id: string): Promise<ProductDto | null>;
  create(product: ProductBase): Promise<ProductDto>;
  deleteById(id: string): Promise<boolean>;
  updateById(id: string, update: Partial<ProductBase>): Promise<ProductDto | null>;
}
