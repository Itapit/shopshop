import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sign-in-link',
  standalone: false,
  templateUrl: './sign-in-link.component.html',
  styleUrl: './sign-in-link.component.css',
})
export class SignInLinkComponent {
  buttonText = signal('Sign in')
}
