import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import { EnvironmentService } from '../../core/environments/services/environment.service';
import { NavigationService } from '../../core/navigation/services/navigation.service';
import { NavigationPaths, PATHS } from '../../core/navigation/common/navigation.interface';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../auth/state/auth.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  public readonly userLoggedIn$: Observable<boolean> = this.store.select(AuthState.getIsAuthenticated);
  public brand!: string;

  constructor(
    private readonly store: Store,
    private readonly environmentService: EnvironmentService,
    private readonly navigationService: NavigationService,
    @Inject(PATHS) private readonly paths: NavigationPaths,
  ) {}

  public ngOnInit() {
    this.brand = this.environmentService.environments.brand;
  }

  public async logIn(): Promise<void> {
    await this.navigationService.navigate([this.paths.auth]);
  }

  public async goToListPage(): Promise<void> {
    await this.navigationService.navigate([this.paths.home, this.paths.list]);
  }
}
