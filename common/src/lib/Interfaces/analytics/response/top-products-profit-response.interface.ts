
interface TopProductsProfitRow {
  month: string;
  productId: string;
  profit: number;
  productName: string;
}

export interface TopProductsProfitResponse {
  months: string[];
  rows: TopProductsProfitRow[];
  totalsPerMonth: number[];
  
}
