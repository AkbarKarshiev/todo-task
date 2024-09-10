import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NavigationPaths, PATHS } from '../../../../core/navigation/common/navigation.interface';
import { AuthFormFieldsKeys, SignInSubmitBody } from '../../common/auth.interface';
import { AuthActions } from '../../state/auth.actions';
import { DisposableService } from '../../../../core/services/disposable.service';
import { AuthState } from '../../state/auth.state';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DisposableService],
})
export class SignInComponent {
  public readonly loading$: Observable<boolean> = this.store.select(AuthState.getLoading);
  public readonly formFieldKeys = AuthFormFieldsKeys;
  public readonly signUpLink = `${this.paths.auth}/${this.paths.signUp}`;
  public readonly signInForm = new FormGroup({
    [AuthFormFieldsKeys.Email]: new FormControl<string>('', [Validators.email, Validators.required]),
    [AuthFormFieldsKeys.Password]: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private readonly store: Store,
    @Inject(PATHS) private readonly paths: NavigationPaths,
  ) {}

  public submit(): void {
    if (this.signInForm.invalid) {
      return;
    }

    const submitData = this.signInForm.value as SignInSubmitBody;

    this.store.dispatch(new AuthActions.SignIn(submitData));
  }
}
