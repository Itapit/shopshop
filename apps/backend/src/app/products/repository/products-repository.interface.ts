import { ProductBase } from 'common/src/lib/Interfaces/product.interface';

export const PRODUCTS_REPOSITORY = Symbol('PRODUCTS_REPOSITORY');

export interface IProductsRepository {
  getPaginatedProducts(
    page: number,
    limit: number,
    sortBy: string
  ): Promise<{
    products: ProductBase[];
    totalCount: number;
  }>;

  findById(id: string): Promise<ProductBase | null>;

  create(product: ProductBase): Promise<ProductBase>;
}
