import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { LayoutComponent } from './layout.component';
import { HeaderModule } from './components/header/header.module';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    NzGridModule,
    RouterOutlet,
    HeaderModule,
    NzSpinComponent,
    NgxLoadingModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule { }
