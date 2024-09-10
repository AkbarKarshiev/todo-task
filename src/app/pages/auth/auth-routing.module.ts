import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthComponent } from './auth.component';
import { RouteData } from '../../core/navigation/common/router.interface';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
        data: { meta: { title: 'Sign In Page' } } as Partial<RouteData>
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        data: { meta: { title: 'Sign Up Page' } } as Partial<RouteData>
      },
      {
        path: '**',
        redirectTo: 'sign-in',
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
