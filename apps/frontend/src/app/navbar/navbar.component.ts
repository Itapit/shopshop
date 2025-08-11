import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NavBarOptions } from './navbar-options.interface';
import { selectNavbarVM } from './store/navbar.selectors';

@Component({
    selector: 'app-navbar',
    standalone: false,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    private readonly store = inject(Store);
    vm$: Observable<NavBarOptions> = this.store.select(selectNavbarVM);
}
