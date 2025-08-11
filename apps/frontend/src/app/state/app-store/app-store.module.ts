import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'apps/frontend/src/environments/environment';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forRoot(),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, 
            logOnly: environment.production, 
        }),
        CommonModule,
    ],
})
export class AppStoreModule {}
