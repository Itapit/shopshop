import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetProfileResponse } from '@common/Interfaces';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    constructor(
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router
    ) {}

    signIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signIn),
            switchMap(({ signInRequest }) =>
                this.authService.signIn(signInRequest).pipe(
                    mergeMap(() => [AuthActions.signInSuccess(), AuthActions.getSession()]),
                    catchError((err) => of(AuthActions.signInFailure({ error: err?.message ?? 'Sign in failed' })))
                )
            )
        )
    );

    getSession$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.getSession),
            switchMap(() =>
                this.authService.getSession().pipe(
                    map((profile: GetProfileResponse) => AuthActions.getSessionSuccess({ profile })),
                    catchError((err) =>
                        of(AuthActions.getSessionFailure({ error: err?.message ?? 'Get session failed' }))
                    )
                )
            )
        )
    );

    signUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signUp),
            switchMap((req) =>
                this.authService.signUp(req).pipe(
                    mergeMap((res) => [AuthActions.signUpSuccess(res)]),
                    catchError((err) => of(AuthActions.signUpFailure({ error: err?.message ?? 'Sign up failed' })))
                )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            switchMap(() =>
                this.authService.logout().pipe(
                    map(() => AuthActions.logoutSuccess()),
                    catchError((err) => of(AuthActions.logoutFailure({ error: err?.message ?? 'Logout failed' })))
                )
            )
        )
    );

    logoutSuccessNavigate$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logoutSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Logged Out',
                        detail: 'You have successfully logged out.',
                    });
                    this.router.navigate(['/']);
                })
            ),
        { dispatch: false }
    );
    logoutFailureToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logoutFailure),
                tap(({ error }) => {
                    this.messageService.add({ severity: 'error', summary: 'Logout failed', detail: error });
                })
            ),
        { dispatch: false }
    );
}
