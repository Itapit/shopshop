import { OrderDto } from "./order.dto";

export class GetOrdersListResponseDTO {
  data!: OrderDto[];
  page!: number;
  limit!: number;
  totalCount!: number;
  totalPages!: number;
}
