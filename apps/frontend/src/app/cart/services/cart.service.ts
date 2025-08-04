import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductItem } from "@common/Interfaces";
import { environment } from "apps/frontend/src/environments/environment";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class CartService{
    private readonly baseUrl = `${environment.BACKEND_BASE_URL}/carts`;

    constructor(private http: HttpClient){} 

    updateCartItemQuantity(item: ProductItem): void {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

        console.log("in the service");

        this.http.put(`${this.baseUrl}/item`, item, { headers }).subscribe({
            next: (res) => {
            console.log("success", res);
            },
            error: (err) => {
            console.error("failed", err);
            }
        });
    } 

    getCart(): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

        return this.http.get(`${this.baseUrl}`, { headers });

       
    }

}