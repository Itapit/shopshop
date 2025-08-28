import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalesStatsRequest, SalesStatsResponse } from '@common/Interfaces';
import { environment } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SalesAnalyticsGeneralService {
    private readonly baseUrl = `${environment.BACKEND_BASE_URL}`;

    constructor(private readonly http: HttpClient) {}

    loadGeneralSalesStats(dto: SalesStatsRequest): Observable<SalesStatsResponse> {
        const params = new HttpParams({
            fromObject: {
                'dateRange[start]': dto.dateRange.start,
                'dateRange[end]': dto.dateRange.end,
                candleInterval: String(dto.candleInterval),
                ...(dto.timezone ? { timezone: dto.timezone } : {}),
            },
        });

        return this.http.get<SalesStatsResponse>(`${this.baseUrl}/analytics/general-metrics`, { params });
    }
}
