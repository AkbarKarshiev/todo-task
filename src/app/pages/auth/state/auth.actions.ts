import { SignInSubmitBody, SignUpSubmitBody } from '../common/auth.interface';

const ACTION_SCOPE = '[Auth]';

export namespace AuthActions {
  export class SignIn {
    static readonly type = `${ACTION_SCOPE} Sign In`;

    constructor(public payload: SignInSubmitBody) {}
  }

  export class SignUp {
    static readonly type = `${ACTION_SCOPE} Sign Up`;

    constructor(public payload: SignUpSubmitBody) {}
  }

  export class LogOut {
    static readonly type = `${ACTION_SCOPE} Log Out`;
  }
}
