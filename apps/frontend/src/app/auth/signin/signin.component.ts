import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { Role } from 'common/src/lib/Enums/role.enum';
import { SignInRequest } from '@common/Interfaces';
import { SharedService } from '../../shared/shared.service';
import { AuthSession } from '../auth-session.interface';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(private readonly authService: AuthService , private router: Router , private tokenService: TokenService, private sharedService: SharedService) {}

  title = 'Sign In';
  buttonLabel = 'Sign In';
  buttonIcon = 'pi pi-sign-in';

  emailLabel = 'Email';
  emailPlaceholder = 'Enter your email';
  emailRequiredMsg = 'Email is required.';
  emailInvalidMsg = 'Enter a valid email address.';

  passwordLabel = 'Password';
  passwordPlaceholder = 'Enter your password';
  passwordRequiredMsg = 'Password is required.';
  passwordMinLength = 6;  // This is for the validator and the string output
  passwordMinLengthMsg = `Password must be at least ${this.passwordMinLength} characters.`;

  email: string | undefined
  password: string | undefined

  onSignin(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    console.log("sign in: ", this.email, this.password);
    const dto: SignInRequest = {
      email : this.email ?? '',
      password : this.password ?? '',
    };
    this.authService.signIn(dto).subscribe({  //TODO add a loading screen for the back wait
      next: (res) => {
        if (res.access_token && res.role) {
          const session: AuthSession = {
            token: res.access_token,
            role: res.role as Role
          };
          this.tokenService.saveSession(session);
          this.sharedService.setUserData(session);
        }
        if(this.tokenService.getRole() === Role.Client || this.tokenService.getRole() === Role.Admin)
          this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Signin failed', err);
      },
    });
  }
}
