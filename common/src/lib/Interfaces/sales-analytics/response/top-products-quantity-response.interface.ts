
interface TopProductsQuantityRow {
  month: string;
  productId: string;
  quantity: number;
}

export interface TopProductsQuantityResponse {
  months: string[];
  rows: TopProductsQuantityRow[];
  totalsPerMonth: number[];
}
