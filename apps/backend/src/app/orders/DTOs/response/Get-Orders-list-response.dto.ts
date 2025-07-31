import { GetOrdersListResponse, OrderFull } from "@common/Interfaces";

export class GetOrdersListResponseDTO implements GetOrdersListResponse{
  orders: OrderFull[];
  page!: number;
  limit!: number;
  totalCount!: number;
  totalPages!: number;
}
