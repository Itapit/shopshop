import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  showSignInLink: boolean = true;
  showOrderButton: boolean = true;
  showAddItemButton: boolean = true;



  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;

      switch (this.router.url) {
          case '/user':
            this.showAddItemButton = true;
            this.showOrderButton = true;
            this.showSignInLink = false;
            break;

          case '/':
            this.showAddItemButton = false;
            this.showOrderButton = false;
            this.showSignInLink = true;
            break;

          default:
            this.showAddItemButton = false;
            this.showOrderButton = false;
            this.showSignInLink = false;
            break;
    }
      
    });
  }

}
