import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';

import { SignInComponent } from './sign-in.component';
import { NavigationPathPipe } from '../../../../core/navigation/pipes/navigation-path.pipe';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzFlexModule,
    RouterLink,
    NavigationPathPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SignInComponent],
})
export class SignInModule { }
