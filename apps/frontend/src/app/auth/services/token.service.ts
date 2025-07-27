import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TokenService{
    private tokenKey:string = 'token'
    private roleKey:string = 'role'
    saveToken(token:string):void{
       localStorage.setItem(this.tokenKey , token)
    }  

    getToken():string{
        return localStorage.getItem(this.tokenKey) || '';
    } 

    removeToken():void{
        localStorage.removeItem(this.tokenKey);
    } 
    saveRole(role:string):void{
        localStorage.setItem(this.roleKey , role)
    } 
    removeRole():void{
        localStorage.removeItem(this.roleKey);
    } 
    getRole():string{
        return localStorage.getItem(this.roleKey) || '';
    }

}
