interface TopProductsQuantityRow {
    month: string;
    productId: string;
    quantity: number;
    productName: string;
}

export interface TopProductsQuantityResponse {
    months: string[];
    rows: TopProductsQuantityRow[];
    totalsPerMonth: number[];
}
