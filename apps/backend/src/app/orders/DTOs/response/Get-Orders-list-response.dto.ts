import { OrderDto } from "../base";


export class GetOrdersListResponseDTO {
  data!: OrderDto[];
  page!: number;
  limit!: number;
  totalCount!: number;
  totalPages!: number;
}
