import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetProductsListRequestDTO, GetProductsListResponseDTO } from '@common/DTOs';
import { environment } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsHttpService {
  private readonly baseUrl = `${environment.BACKEND_BASE_URL}/products`;

  constructor(private readonly http: HttpClient) {}

  getProducts(dto: GetProductsListRequestDTO): Observable<GetProductsListResponseDTO> {
    return this.http.get<GetProductsListResponseDTO>(`${this.baseUrl}`, { params: dto as any });
  }
}
