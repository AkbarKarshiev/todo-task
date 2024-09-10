import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AppCoreModule } from './app.core.module';
import { NzSpinComponent } from 'ng-zorro-antd/spin';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppCoreModule,
    AppRoutingModule,
    NzSpinComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
