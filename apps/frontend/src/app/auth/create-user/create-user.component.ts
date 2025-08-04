import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateUserRequest } from '@common/Interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  constructor(private authService: AuthService) {};

  title = 'Create User';
  buttonLabel = 'Create User';
  buttonIcon = 'pi pi-sign-un';

  usernameLabel = 'Username';
  usernamePlaceHolder = 'Enter your username';
  usernameRequiredMSG = 'Username is required';
  usernameInvalidMsg = 'Enter a valid username';

  emailLabel = 'Email';
  emailPlaceholder = 'Enter your email';
  emailRequiredMsg = 'Email is required.';
  emailInvalidMsg = 'Enter a valid email address.';

  passwordLabel = 'Password';
  passwordPlaceholder = 'Enter your password';
  passwordRequiredMsg = 'Password is required.';
  passwordMinLength = 6;  // This is for the validator and the string output
  passwordMinLengthMsg = `Password must be at least ${this.passwordMinLength} characters.`;

  username: string | undefined;
  email: string | undefined;
  password: string | undefined;

  onCreateUser(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    const dto: CreateUserRequest = {
      username: this.username ?? '',
      email : this.email ?? '',
      password : this.password ?? '',
    };
    this.authService.signUp(dto).subscribe({
      next: (res) => {
        console.log('signup success', res);
      },
      error: (err) => {
        console.error('Signup failed', err);
      },
    });
  }
}
