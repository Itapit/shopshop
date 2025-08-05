import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { AdminGuard } from './guards/admin.guard';
import { SigninComponent } from './sign-in/signin.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SigninComponent },
    {
        path: 'signup',
        component: CreateUserComponent,
        canActivate: [AdminGuard],
    },
    { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
