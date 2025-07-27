import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private orderClickSubject = new Subject<void>();

  orderClicked$ = this.orderClickSubject.asObservable();

  triggerOrder() {
    this.orderClickSubject.next();
  }
}
