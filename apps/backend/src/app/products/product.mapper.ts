import { ProductDto } from "@common/DTOs";
import { ProductBase } from "@common/Interfaces";

export function mapToProductDto(product: ProductBase): ProductDto {
  const dto = new ProductDto();
  dto.name = product.name;
  dto.description = product.description;
  dto.price = product.price;
  dto.quantity = product.quantity;
  dto.imageUrl = product.imageUrl;
  return dto;
}
