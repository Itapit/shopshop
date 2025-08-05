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

    constructor(private http: HttpClient ){} 

    updateCartItemQuantity(item: ProductItem): Observable<any> {
        

        

        return this.http.put(`${this.baseUrl}/item`, item)
    } 

    getCart(): Observable<any> {
        

        return this.http.get(`${this.baseUrl}`);

       
    }

    getCartPrice(): Observable<any>{
        

        return this.http.get(`${this.baseUrl}/total`);
    } 

    deleteCart():Observable<any>{
        

        return this.http.delete(`${this.baseUrl}`);
    }

    

    
}