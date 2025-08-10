import { SignInRequest } from '@common/Interfaces';
import { createAction, props } from '@ngrx/store';

export const signin = createAction('[Auth] signin', props<SignInRequest>);
