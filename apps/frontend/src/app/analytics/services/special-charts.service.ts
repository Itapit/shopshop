import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TopProductsProfitResponse, TopProductsQuantityResponse, TopProductsRequest } from '@common/Interfaces';
import { environment } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';

// export type SalesMetric = 'quantity' | 'profit';

// export interface TopKParams {
//   fromMonth: string;   // e.g. '2025-01'
//   toMonth:   string;   // e.g. '2025-04'
//   k:         number;   // e.g. 5
//   metric:    SalesMetric;
// }

// export interface TopKResponse {
//   months: string[]; // ['2025-01','2025-02',...]
//   series: { id: string; label: string; values: number[] }[];
// }

@Injectable({ providedIn: 'root' })
export class SpecialApi {
    constructor(private http: HttpClient) {}
    private readonly baseUrl = `${environment.BACKEND_BASE_URL}/analytics`;

    getTopProductsQuantity(
        params: TopProductsRequest
    ): Observable<TopProductsQuantityResponse | TopProductsProfitResponse> {
        return this.http.get<TopProductsQuantityResponse | TopProductsProfitResponse>(`${this.baseUrl}/top-products`, {
            params: params as any,
        });
    }
}
