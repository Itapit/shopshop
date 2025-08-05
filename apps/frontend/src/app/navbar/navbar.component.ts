import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../auth/services/token.service';
import { Role } from '@common/Enums';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { AuthSession } from '../auth/auth-session.interface';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private sharedService: SharedService, private router:Router) {}

  showSignInLink: boolean = true;
  showOrderLink: boolean = false;
  showSignUpLink: boolean = false;
  showStatsLink: boolean = false;
  showCartLink: boolean = false;

  private userSub!: Subscription;

  ngOnInit(): void {
    this.userSub = this.sharedService.userData$.subscribe((session: AuthSession | null) => {
      this.showCartLink = session?.role === Role.Client;
      this.showOrderLink = session?.role === Role.Client;
      this.showSignInLink = !session;
      this.showSignUpLink = session?.role === Role.Admin;
      this.showStatsLink = session?.role === Role.Admin;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
