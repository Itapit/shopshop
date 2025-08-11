import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'apps/frontend/src/environments/environment';
import { AuthEffects } from '../../auth/store/auth.effects';
import { authFeature } from '../../auth/store/auth.reducer';
import { AppInitEffects } from './app-init.effects';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forRoot({
            router: routerReducer,
            [authFeature.name]: authFeature.reducer,
        }),
        EffectsModule.forRoot([AppInitEffects, AuthEffects]),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        CommonModule,
    ],
})
export class AppStoreModule {}
