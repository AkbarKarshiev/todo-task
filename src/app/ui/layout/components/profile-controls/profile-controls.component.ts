import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AuthState } from '../../../../pages/auth/state/auth.state';
import { NavigationService } from '../../../../core/navigation/services/navigation.service';
import { NavigationPaths, PATHS } from '../../../../core/navigation/common/navigation.interface';
import { AuthActions } from '../../../../pages/auth/state/auth.actions';

@Component({
  selector: 'app-profile-controls',
  templateUrl: './profile-controls.component.html',
  styleUrl: './profile-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileControlsComponent {
  public readonly userLoggedIn$: Observable<boolean> = this.store.select(AuthState.getIsAuthenticated);

  constructor(
    private readonly store: Store,
    private readonly navigationService: NavigationService,
    @Inject(PATHS) private readonly paths: NavigationPaths,
  ) {}

  public logOut(): void {
    this.store.dispatch(new AuthActions.LogOut());
  }

  public logIn(): void {
    this.navigationService.navigate([this.paths.auth]).then()
  }
}
