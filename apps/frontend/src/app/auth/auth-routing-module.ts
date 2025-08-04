import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './sign-in/signin.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full'},
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: CreateUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
