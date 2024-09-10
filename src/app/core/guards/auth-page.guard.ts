import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { NavigationService } from '../navigation/services/navigation.service';
import { NavigationPaths, PATHS } from '../navigation/common/navigation.interface';
import { Store } from '@ngxs/store';
import { AuthState } from '../../pages/auth/state/auth.state';
import { of, switchMap } from 'rxjs';

export const authPageGuard: CanActivateFn = () => {
  const store = inject(Store);
  const navigationService = inject(NavigationService);
  const paths = inject<NavigationPaths>(PATHS);

  return store.select(AuthState.getIsAuthenticated).pipe(
    switchMap((loggedIn) => {
      if (loggedIn) {
        return navigationService.navigate([paths.home, paths.main])
      }

      return of(true);
    }),
  );
};
