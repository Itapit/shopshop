import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TokenService{
    private key:string = 'token'
    saveToken(token:string):void{
       localStorage.setItem(this.key , token)
    }  

    getToken():string{
        return localStorage.getItem(this.key) || '';
    } 

    removeToken():void{
        localStorage.removeItem(this.key);
    }


}
