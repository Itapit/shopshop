import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  title = 'Sign In';
  emailLabel = 'Email';
  emailPlaceholder = 'Enter your email';
  passwordLabel = 'Password';
  passwordPlaceholder = 'Enter your password';
  buttonLabel = 'Sign In';


  email: string | undefined
  password: string | undefined

  onSubmit() {
    console.log("sign in: ", this.email, this.password);
  }
}
