import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TopProductsProfitResponse, TopProductsQuantityResponse, TopProductsRequest } from '@common/Interfaces';
import { environment } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SalesAnalyticsCustomService {
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
