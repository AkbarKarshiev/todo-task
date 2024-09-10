import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    NzButtonComponent,
    MainRoutingModule,
  ],
})
export class MainModule { }
