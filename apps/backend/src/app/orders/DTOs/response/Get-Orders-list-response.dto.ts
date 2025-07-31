import { GetOrdersListResponse, OrderBase, OrderFull } from "@common/Interfaces";
import { OrderDto } from "../base";

export class GetOrdersListResponseDTO implements GetOrdersListResponse{
  orders: OrderBase[];
  page!: number;
  limit!: number;
  totalCount!: number;
  totalPages!: number;
}
