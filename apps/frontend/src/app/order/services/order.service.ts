import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductItem } from '@common/Interfaces';
import { environment } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private readonly baseUrl = `${environment.BACKEND_BASE_URL}/orders`;

    constructor(private http: HttpClient) {}

    placeOrder(items: ProductItem[]): Observable<any> {
        return this.http.post(`${this.baseUrl}`, { items });
    }
}
