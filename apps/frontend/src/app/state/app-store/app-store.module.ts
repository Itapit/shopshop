import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forRoot({ router: routerReducer }),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
        CommonModule,
    ],
})
export class AppStoreModule {}
