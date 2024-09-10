import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileControlsComponent } from './profile-controls.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [ProfileControlsComponent],
  imports: [
    CommonModule,
    NzButtonComponent,
    NzDropDownModule,
    NzIconModule,
  ],
  exports: [ProfileControlsComponent],
})
export class ProfileControlsModule { }
