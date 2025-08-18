import { TopProductsQuantityResponse } from "@common/Interfaces";

class TopProductsQuantityRow {
  month!: string;
  productId!: string;
  quantity!: number;
}

export class TopProductsQuantityResponseDto implements TopProductsQuantityResponse {
  months!: string[];
  rows!: TopProductsQuantityRow[];
  totalsPerMonth!: number[];
}