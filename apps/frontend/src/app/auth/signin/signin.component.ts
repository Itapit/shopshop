import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

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
  passwordMinLength = 8;
  passwordMinLengthMsg = `Password must be at least ${this.passwordMinLength} characters.`;

  email: string | undefined
  password: string | undefined

  onSubmit() {
    console.log("sign in: ", this.email, this.password);
  }
}
