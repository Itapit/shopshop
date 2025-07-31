import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
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
}
