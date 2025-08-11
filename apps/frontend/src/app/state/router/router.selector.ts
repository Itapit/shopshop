import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouteId, RouteIds } from './route-ids';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const { selectCurrentRoute, selectQueryParams, selectRouteParams, selectRouteData, selectUrl } =
    getRouterSelectors(selectRouter);

export const selectRouteId = createSelector(
    selectRouteData,
    (data): RouteId => (data?.['routeId'] as RouteId) ?? RouteIds.Unknown
);
