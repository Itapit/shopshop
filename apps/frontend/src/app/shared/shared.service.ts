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
  private searchClickSubject = new Subject<void>();

  searchClicked$ = this.searchClickSubject.asObservable();
  orderClicked$ = this.orderClickSubject.asObservable();

  triggerOrder() {
    this.orderClickSubject.next();
  } 

  triggerSearch() {
    this.searchClickSubject.next();
  }
  setUserData(session: AuthSession | null) {
    this.userDataSubject.next(session);
  }

  getUserData(): AuthSession | null { 
    return this.userDataSubject.value;
  }
}
