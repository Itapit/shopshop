import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UiStateService {
    private orderClickSubject = new Subject<void>();
    private searchClickSubject = new Subject<string>();
    private cartClickSubject = new Subject<void>();
    private logoClickSubject = new Subject<void>();
    private statsClickSubject = new Subject<void>();
    private signupClickSubject = new Subject<void>();
    private logoutClickSubject = new Subject<void>();

    searchClicked$ = this.searchClickSubject.asObservable();
    orderClicked$ = this.orderClickSubject.asObservable();
    cartClicked$ = this.cartClickSubject.asObservable();
    logoClicked$ = this.logoClickSubject.asObservable();
    statsClicked$ = this.statsClickSubject.asObservable();
    signupClicked$ = this.signupClickSubject.asObservable();
    logoutClicked$ = this.logoutClickSubject.asObservable()

    triggerOrder() {
        this.orderClickSubject.next();
    }

    triggerSearch(value: string) {
        this.searchClickSubject.next(value);
    }

    triggerCart() {
        this.cartClickSubject.next();
    }
    triggerLogo() {
        this.logoClickSubject.next();
    }

    triggerStats() {
        this.statsClickSubject.next();
    }

    triggerSignUp() {
        this.signupClickSubject.next();
    }

    triggerLogout(){
        this.logoutClickSubject.next();
    }
}
