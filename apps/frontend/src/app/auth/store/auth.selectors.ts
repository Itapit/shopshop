import { Role } from '@common/Enums';
import { createSelector } from '@ngrx/store';
import { authFeature } from './auth.reducer';

export const {
    selectAuthState,
    selectLoading: selectAuthLoading,
    selectError: selectAuthError,
    selectUsername,
    selectEmail,
    selectRole,
} = authFeature;

export const selectIsLoggedIn = createSelector(selectUsername, selectEmail, (username, email) => !!username || !!email);

export const selectIsAdmin = createSelector(selectRole, (role) => role === Role.Admin);
