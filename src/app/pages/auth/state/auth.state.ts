import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthActions } from './auth.actions';
import { AuthApiService } from '../api/auth-api.service';
import { SignInResponse, SignUpResponse } from '../common/auth.interface';
import { ErrorFactoryService } from '../../../core/errors/services/error-factory.service';
import { NavigationService } from '../../../core/navigation/services/navigation.service';
import { NavigationPaths, PATHS } from '../../../core/navigation/common/navigation.interface';

export interface AuthStateModel {
  token: string | null;
  loading: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    loading: false,
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static getToken(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static getLoading(state: AuthStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static getIsAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(
    private readonly errorFactory: ErrorFactoryService,
    private readonly authService: AuthApiService,
    private readonly navigationService: NavigationService,
    private readonly message: NzMessageService,
    @Inject(PATHS) private readonly paths: NavigationPaths,

  ) {}

  @Action(AuthActions.SignIn)
  public signIn(ctx: StateContext<AuthStateModel>, action: AuthActions.SignIn) {
    const state = ctx.getState();
    ctx.setState({ ...state, loading: true });

    return this.authService.signIn(action.payload).pipe(
      tap((response: SignInResponse): void => {
        ctx.setState({ token: response.access_token, loading: false });
        this.navigationService.navigate([this.paths.home, this.paths.list]).then();
      }),
      catchError((error: HttpErrorResponse) => {
        const state = ctx.getState();
        ctx.setState({ ...state, loading: false });
        const getErrorMsg = this.errorFactory.getErrorMessage(this.errorFactory.fromResponse(error));
        this.message.error(getErrorMsg);
        return of(error);
      }),
    );
  }

  @Action(AuthActions.SignUp)
  public signUp(ctx: StateContext<AuthStateModel>, action: AuthActions.SignUp) {
    ctx.patchState({ loading: true });

    return this.authService.signUp(action.payload).pipe(
      tap((response: SignUpResponse): void => {
        this.message.success(response.message);
        ctx.patchState({ loading: false });
        this.navigationService.navigate([this.paths.auth, this.paths.signIn]).then();
      }),
      catchError((error: HttpErrorResponse) => {
        ctx.patchState({ loading: false });
        const getErrorMsg = this.errorFactory.getErrorMessage(this.errorFactory.fromResponse(error));
        this.message.error(getErrorMsg);
        return of(error);
      }),
    );
  }

  @Action(AuthActions.LogOut)
  public signOut(ctx: StateContext<AuthStateModel>) {
    ctx.setState({ token: null, loading: false });
    this.navigationService.navigate([this.paths.auth]).then();
  }
}
