import { Role } from '@common/Enums';
import { createSelector } from '@ngrx/store';
import { selectRole } from '../../auth/store/auth.selectors';
import { RouteId } from '../../state/router/route-ids';
import { selectRouteId } from '../../state/router/router.selector';
import { NavBarOptions } from '../navbar-options.interface';

export const selectNavbarVM = createSelector(selectRole, selectRouteId, (role, routeId): NavBarOptions => {
    const isLoggedIn = !!role;
    const isAdmin = role === Role.Admin;
    const isClient = role === Role.Client;

    const hideSearchOn =
        routeId === RouteId.Cart ||
        routeId === RouteId.AdminStats ||
        routeId === RouteId.AuthSignIn ||
        routeId === RouteId.AuthSignUp;

    return {
        showSignInLink: !isLoggedIn && routeId !== RouteId.AuthSignIn,
        showLogoutLink: isLoggedIn,

        showCartLink: isClient && routeId !== RouteId.Cart,
        showOrderLink: isClient && routeId == RouteId.Cart,

        showSearch: !hideSearchOn,

        showSignUpLink: isAdmin,
        showStatsLink: isAdmin,
    };
});
