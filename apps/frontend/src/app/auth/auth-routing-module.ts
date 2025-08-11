import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '@common/Enums';
import { RouteIds } from '../state/router/route-ids';
import { CreateUserComponent } from './create-user/create-user.component';
import { RoleGuard } from './guards/role.guard';
import { SigninComponent } from './sign-in/signin.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SigninComponent, data: { routeId: RouteIds.AuthSignIn } },
    {
        path: 'signup',
        component: CreateUserComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: Role.Admin, routeId: RouteIds.AuthSignUp },
    },
    { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
