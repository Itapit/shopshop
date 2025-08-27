import { Injectable, inject } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as AuthActions from '../../auth/store/auth.actions';

@Injectable()
export class AppInitEffects {
    private actions$ = inject(Actions);

    initGetSession$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            map(() => AuthActions.getSession())
        )
    );
}
