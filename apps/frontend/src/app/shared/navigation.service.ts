import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    private previousUrl: string = '/';
    private currentUrl: string = '/';

    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                console.log("changed route")
                this.previousUrl = this.currentUrl;
                  console.log("changed route" , this.previousUrl);
                this.currentUrl = event.urlAfterRedirects;
            }
        });
    }

    public getPreviousUrl(): string {
        return this.previousUrl;
    }
}
