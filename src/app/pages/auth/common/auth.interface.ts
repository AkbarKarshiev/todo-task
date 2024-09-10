export interface SignInSubmitBody {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  token_type: string;
}

export interface SignUpSubmitBody {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface SignUpResponse {
  message: string;
}

export enum AuthFormFieldsKeys {
  Email = 'email',
  Password = 'password',
  UserName = 'name',
  PasswordConfirmation = 'password_confirmation',
}
