import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminStatsService {
    private baseUrl = `${environment.BACKEND_BASE_URL}/orders`;

    constructor(private http: HttpClient) {}

    getTotalProfit(): Observable<{ totalProfit: number }> {
        return this.http.get<{ totalProfit: number }>(`${this.baseUrl}/total-profit`);
    }
}
