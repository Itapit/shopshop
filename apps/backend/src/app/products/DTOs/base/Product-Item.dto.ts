import { ProductItem } from "@common/Interfaces"
import { IsInt, IsString, Min } from "class-validator";

export class ProductItemDto implements ProductItem{
  @IsString()
  product_id!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}