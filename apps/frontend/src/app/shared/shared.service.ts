import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private orderClickSubject = new Subject<void>();
  private searchClickSubject = new Subject<string>();
  

  searchClicked$ = this.searchClickSubject.asObservable();
  orderClicked$ = this.orderClickSubject.asObservable();
  

  triggerOrder() {
    this.orderClickSubject.next();
  } 

  triggerSearch(value:string) {
    this.searchClickSubject.next(value);
  } 

  
}
