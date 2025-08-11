import { Injectable, inject } from '@angular/core';
import { CreateUserRequest, SignInRequest } from '@common/Interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app-store/app.state';
import * as AuthActions from './auth.actions';
import {
    selectAuthError,
    selectAuthLoading,
    selectEmail,
    selectIsAdmin,
    selectIsLoggedIn,
    selectProfile,
    selectRole,
    selectUsername,
} from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
    private store = inject<Store<AppState>>(Store);

    loading$ = this.store.select(selectAuthLoading);
    error$ = this.store.select(selectAuthError);
    isLoggedIn$ = this.store.select(selectIsLoggedIn);
    isAdmin$ = this.store.select(selectIsAdmin);
    role$ = this.store.select(selectRole);
    username$ = this.store.select(selectUsername);
    email$ = this.store.select(selectEmail);
    profile$ = this.store.select(selectProfile);

    signIn(payload: SignInRequest) {
        this.store.dispatch(AuthActions.signIn({ signInRequest: payload }));
    }
    signUp(payload: CreateUserRequest) {
        this.store.dispatch(AuthActions.signUp(payload));
    }
    logout() {
        this.store.dispatch(AuthActions.logout());
    }
    loadSession() {
        this.store.dispatch(AuthActions.getSession());
    }
}
