import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateProductRequest, UpdateProductResponse } from '@common/Interfaces';
import { environment } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {
  private baseUrl = `${environment.BACKEND_BASE_URL}/products`;

  constructor(private http: HttpClient) {}

  updateProduct(id: string, payload: UpdateProductRequest): Observable<UpdateProductResponse> {
    return this.http.put<UpdateProductResponse>(`${this.baseUrl}/${id}`, payload);
  }
}