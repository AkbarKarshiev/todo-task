import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SignInSubmitBody, SignInResponse, SignUpSubmitBody, SignUpResponse } from '../common/auth.interface';
import { EnvironmentService } from '../../../core/environments/services/environment.service';
import { ApiService } from '../../../core/api/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private readonly apiService: ApiService, private readonly environmentService: EnvironmentService) { }

  public signIn(data: SignInSubmitBody): Observable<SignInResponse> {
    return this.apiService.post<SignInResponse>( `${this.apiRoute}/login`, data);
  }

  public signUp(data: SignUpSubmitBody): Observable<SignUpResponse> {
    return this.apiService.post<SignUpResponse>( `${this.apiRoute}/register`, data);
  }

  private get apiRoute(): string {
    return this.environmentService.environments.api;
  }
}
