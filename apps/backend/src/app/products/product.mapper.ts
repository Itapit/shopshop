import { ProductDto } from "@common/DTOs";
import { ProductDocument } from "./repository/product.schema";

export function mapToProductDto(product: ProductDocument): ProductDto {
  const dto = new ProductDto();
  dto.name = product.name;
  dto.description = product.description;
  dto.price = product.price;
  dto.quantity = product.quantity;
  dto.imageUrl = product.imageUrl;
  dto._id = product._id.toString();
  return dto;
}
