import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngxs/router-plugin';
import { Injectable } from '@angular/core';

export interface RouterStateParams {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface RouterReducerStateExtended<T extends Record<string, unknown> = Record<string, unknown>> {
  url: string;
  params: Params;
  queryParams: Params;
  data?: T
}

// Map the router snapshot to { url, params, queryParams }
@Injectable()
export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateParams> {
  serialize(routerState: RouterStateSnapshot): RouterReducerStateExtended {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;

    const { params, data } = route;

    return { url, params, queryParams, data };
  }
}
