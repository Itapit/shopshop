import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthSession } from '../auth/auth-session.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userDataSubject = new BehaviorSubject<AuthSession | null>(null);
  public userData$ = this.userDataSubject.asObservable();

  private orderClickSubject = new Subject<void>();
  private searchClickSubject = new Subject<string>();
  private cartClickSubject = new Subject<void>();
  private logoClickSubject  = new Subject<void>();
  

  searchClicked$ = this.searchClickSubject.asObservable();
  orderClicked$ = this.orderClickSubject.asObservable();
  cartClicked$ = this.cartClickSubject.asObservable();
  logoClicked$ = this.logoClickSubject.asObservable();
  

  triggerOrder() {
    this.orderClickSubject.next();
  } 

  triggerSearch(value:string) {
    this.searchClickSubject.next(value);
  } 

  triggerCart(){
    this.cartClickSubject.next();
  }
  triggerLogo(){
    this.logoClickSubject.next();
  }
  setUserData(session: AuthSession | null) {
    this.userDataSubject.next(session);
  }

  getUserData(): AuthSession | null { 
    return this.userDataSubject.value;
  }

  
}
