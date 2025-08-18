
interface TopProductsProfitRow {
  month: string;
  productId: string;
  profit: number;
}

export interface TopProductsProfitResponse {
  months: string[];
  rows: TopProductsProfitRow[];
  totalsPerMonth: number[];
}
