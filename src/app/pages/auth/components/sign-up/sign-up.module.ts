import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { SignUpComponent } from './sign-up.component';
import { RouterLink } from '@angular/router';
import { NavigationPathPipe } from '../../../../core/navigation/pipes/navigation-path.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzFlexModule,
    RouterLink,
    NavigationPathPipe,
    ReactiveFormsModule,
  ],
  exports: [SignUpComponent],
})
export class SignUpModule { }
