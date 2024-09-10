import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NavigationPaths, PATHS } from '../../../../core/navigation/common/navigation.interface';
import { AuthState } from '../../state/auth.state';
import { AuthFormFieldsKeys, SignUpSubmitBody } from '../../common/auth.interface';
import { AuthActions } from '../../state/auth.actions';
import { passwordsMismatch } from '../../validators/passwords-mismatch';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  public loading$: Observable<boolean> = this.store.select(AuthState.getLoading);
  public readonly formFieldKeys = AuthFormFieldsKeys;
  public readonly signInLink = `${this.paths.auth}/${this.paths.signIn}`;
  public readonly signUpForm = new FormGroup({
    [AuthFormFieldsKeys.UserName]: new FormControl<string>('', [Validators.required]),
    [AuthFormFieldsKeys.Email]: new FormControl<string>('', [Validators.email, Validators.required]),
    [AuthFormFieldsKeys.Password]: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    [AuthFormFieldsKeys.PasswordConfirmation]: new FormControl<string>(
      '', [
        Validators.required,
        passwordsMismatch(AuthFormFieldsKeys.Password, AuthFormFieldsKeys.PasswordConfirmation),
      ]),
  });

  constructor(
    private readonly store: Store,
    @Inject(PATHS) private readonly paths: NavigationPaths,
  ) {}

  public submit(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    const submitData = this.signUpForm.value as SignUpSubmitBody;

    this.store.dispatch(new AuthActions.SignUp(submitData));
  }
}
