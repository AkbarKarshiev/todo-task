import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { NavigationService } from '../navigation/services/navigation.service';
import { NavigationPaths, PATHS } from '../navigation/common/navigation.interface';
import { AuthState } from '../../pages/auth/state/auth.state';
import { of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const navigationService = inject(NavigationService);
  const paths = inject<NavigationPaths>(PATHS);

  return store.select(AuthState.getIsAuthenticated).pipe(
    switchMap((loggedIn) => {
      if (!loggedIn) {
        return navigationService.navigate([paths.home, paths.auth])
      }

      return of(true);
    }),
  );
};
