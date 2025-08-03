import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetProductByIdResponse, GetProductsListRequest, GetProductsListResponse, ProductFull } from '@common/Interfaces';
import { environment } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsHttpService {
  private readonly baseUrl = `${environment.BACKEND_BASE_URL}/products`;

  constructor(private readonly http: HttpClient) {}

  getProducts(dto: GetProductsListRequest): Observable<GetProductsListResponse> {
    return this.http.get<GetProductsListResponse>(`${this.baseUrl}`, { params: dto as any });
  }

  getProductById(id: string): Observable<GetProductByIdResponse> {
    return this.http.get<GetProductByIdResponse>(`${this.baseUrl}/${id}`);
  }
}
