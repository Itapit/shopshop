import { Role } from '@common/Enums';
import { createSelector } from '@ngrx/store';
import { selectRole } from '../../auth/store/auth.selectors';
import { RouteIds } from '../../state/router/route-ids';
import { selectRouteId } from '../../state/router/router.selector';
import { NavBarOptions } from '../navbar-options.interface';

export const selectNavbarVM = createSelector(selectRole, selectRouteId, (role, routeId): NavBarOptions => {
    const isLoggedIn = !!role;
    const isAdmin = role === Role.Admin;
    const isClient = role === Role.Client;

    const onCart = routeId === RouteIds.Cart;

    const hideSearchOn =
        routeId === RouteIds.Cart ||
        routeId === RouteIds.AdminStats ||
        routeId === RouteIds.AuthSignIn ||
        routeId === RouteIds.AuthSignUp;

    return {
        showSignInLink: !isLoggedIn && routeId !== RouteIds.AuthSignIn,
        showLogoutLink: isLoggedIn,

        showCartLink: isClient && !onCart,
        showOrderLink: isClient && onCart,

        showSearch: !hideSearchOn,

        showSignUpLink: isAdmin,
        showStatsLink: isAdmin,
        showAddProductLink: isAdmin,
    };
});
