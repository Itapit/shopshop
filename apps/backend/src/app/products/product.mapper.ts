import { ProductBase } from 'common/src/lib/Interfaces/product.interface';
import { ProductDto } from 'common/src/lib/DTOs/products/product.dto';

export function mapToProductDto(product: ProductBase): ProductDto {
  const dto = new ProductDto();
  dto.name = product.name;
  dto.description = product.description;
  dto.price = product.price;
  dto.quantity = product.quantity;
  dto.imageUrl = product.imageUrl;
  return dto;
}
