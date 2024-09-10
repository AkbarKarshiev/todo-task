import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { LogoModule } from '../logo/logo.module';
import { ProfileControlsModule } from '../profile-controls/profile-controls.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    LogoModule,
    NzFlexDirective,
    ProfileControlsModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
