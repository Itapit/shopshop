import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SignInDto } from 'common/src/lib/DTOs/sign-In.dto';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(private readonly authService: AuthService) {}

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

  onSignin() {
    console.log("sign in: ", this.email, this.password);
    const dto: SignInDto = {
      email : this.email ?? '',
      password : this.password ?? '',
    };
    this.authService.signIn(dto).subscribe({
      next: (res) => {
        console.log('Signed in!', res);
      },
      error: (err) => {
        console.error('Signin failed', err);
      },
    });
  }
}
