import { createFeature, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { authFeatureKey, initialAuthState } from './auth.state';

export const authReducer = createReducer(
    initialAuthState,

    on(AuthActions.signIn, AuthActions.getSession, AuthActions.signUp, AuthActions.logout, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(AuthActions.getSessionSuccess, (state, { profile }) => ({
        ...state,
        email: profile.email ?? null,
        username: profile.username ?? null,
        role: profile.role ?? null,
        loading: false,
        error: null,
    })),
    on(AuthActions.clearAuthError, (state) => ({ ...state, error: null })),
    on(AuthActions.signInSuccess, (state) => ({ ...state, error: null })),

    on(AuthActions.logoutSuccess, () => initialAuthState),
    on(AuthActions.signUpSuccess, (state) => ({ ...state, loading: false })),

    on(
        AuthActions.logoutFailure,
        AuthActions.signInFailure,
        AuthActions.signUpFailure,
        AuthActions.getSessionFailure,
        (state, { error }) => ({ ...state, loading: false, error })
    )
);

export const authFeature = createFeature({
    name: authFeatureKey,
    reducer: authReducer,
});
