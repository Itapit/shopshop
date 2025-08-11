import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteIds } from '../state/router/route-ids';
import { CreateUserComponent } from './create-user/create-user.component';
import { SigninComponent } from './sign-in/signin.component';

const routes: Routes = [
    {
        path: 'auth',
        children: [
            { path: 'signin', component: SigninComponent, data: { routeId: RouteIds.AuthSignIn } },
            { path: 'signup', component: CreateUserComponent, data: { routeId: RouteIds.AuthSignUp } },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
