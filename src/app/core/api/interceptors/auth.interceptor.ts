import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { Store } from '@ngxs/store';

import { AuthState } from '../../../pages/auth/state/auth.state';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const store = inject(Store);

  return store.select(AuthState.getToken).pipe(
    take(1),
    switchMap((token: string | null) => {
      let extendedReq = req;

      if (token) {
        extendedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      return next(extendedReq);
    }),
  )
}
