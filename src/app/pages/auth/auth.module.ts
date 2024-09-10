import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInModule } from './components/sign-in/sign-in.module';
import { SignUpModule } from './components/sign-up/sign-up.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [SignInModule, SignUpModule, AuthRoutingModule],
})
export class AuthModule { }
