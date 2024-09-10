import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';

import { NAVIGATION_PATHS, PATHS } from './core/navigation/common/navigation.interface';
import { ENVIRONMENTS } from './core/environments/common/environment.interface';
import { environment } from '../environments/environment';
import { RootStoreModule } from './core/store/root/root.module';
import { authInterceptor } from './core/api/interceptors/auth.interceptor';
import { ListStateModule } from './pages/list/state/list-state.module';

@NgModule({
  imports: [
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.chasingDots,
      backdropBackgroundColour: "rgba(0,0,0,0.5)",
      primaryColour: "#1890ff",
      secondaryColour: "#1890ff",
    }),
    RootStoreModule,
    ListStateModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    {
      provide: ENVIRONMENTS,
      useValue: environment,
    },
    {
      provide: PATHS,
      useValue: NAVIGATION_PATHS,
    },
  ],
})
export class AppCoreModule { }
