import { CreateUserRequest, CreateUserResponse, GetProfileResponse, SignInRequest } from '@common/Interfaces';
import { createAction, props } from '@ngrx/store';

// Sign In
export const signIn = createAction('[Auth] Sign In', props<SignInRequest>());
export const signInSuccess = createAction('[Auth] Sign In Success'); // cookie only
export const signInFailure = createAction('[Auth] Sign In Failure', props<{ error: string }>());

// Session/Profile
export const getSession = createAction('[Auth] Get Session');
export const getSessionSuccess = createAction('[Auth] Get Session Success', props<{ profile: GetProfileResponse }>());
export const getSessionFailure = createAction('[Auth] Get Session Failure', props<{ error: string }>());

// Sign Up
export const signUp = createAction('[Auth] Sign Up', props<CreateUserRequest>());
export const signUpSuccess = createAction('[Auth] Sign Up Success', props<CreateUserResponse>());
export const signUpFailure = createAction('[Auth] Sign Up Failure', props<{ error: string }>());

// Logout
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: string }>());

export const clearAuthError = createAction('[Auth] Clear Error');
