import { ProductDto } from './product.dto';

export class UpdateProductResponseDto implements ProductDto {
  name!: string;
  description!: string;
  price!: number;
  quantity!: number;
  imageUrl!: string;
  _id?: string;

  constructor(product: ProductDto) {
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.quantity = product.quantity;
    this.imageUrl = product.imageUrl;
    this._id = product._id;
  }
}
