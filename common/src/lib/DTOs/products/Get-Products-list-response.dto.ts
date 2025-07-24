import { ProductDto } from "./product.dto";

export class GetProductsListResponseDTO {
  data!: ProductDto[];
  page!: number;
  limit!: number;
  totalCount!: number;
  totalPages!: number;
}
