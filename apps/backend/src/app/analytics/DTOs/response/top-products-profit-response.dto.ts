import { TopProductsProfitResponse } from "@common/Interfaces";

class TopProductsProfitRow {
  month!: string;
  productId!: string;
  profit!: number;
}

export class TopProductsProfitResponseDto implements TopProductsProfitResponse {
  months!: string[];
  rows!: TopProductsProfitRow[];
  totalsPerMonth!: number[];
}