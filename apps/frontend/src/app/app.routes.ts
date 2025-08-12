import { Route } from '@angular/router';
import { Role } from '@common/Enums';
import { RoleGuard } from './auth/guards/role.guard';

export const appRoutes: Route[] = [
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin-module').then((m) => m.AdminModule),
        canActivate: [RoleGuard],
        data: { expectedRole: Role.Admin },
    },
];
