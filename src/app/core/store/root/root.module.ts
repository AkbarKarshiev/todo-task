import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { LOCAL_STORAGE_ENGINE, NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule, RouterStateSerializer } from '@ngxs/router-plugin';

import { AuthApiModule } from '../../../pages/auth/api/auth-api.module';
import { AuthState } from '../../../pages/auth/state/auth.state';
import { environment } from '../../../../environments/environment';
import { CustomRouterStateSerializer } from './custom-router-state-serializer.service';

@NgModule({
  imports: [
    AuthApiModule,
    NgxsModule.forRoot(
      [AuthState],
      { developmentMode: !environment.production },
    ),
    NgxsStoragePluginModule.forRoot({
      keys: [{
        key: 'auth.token',
        engine: LOCAL_STORAGE_ENGINE,
      }],
    }),
    NgxsRouterPluginModule.forRoot(),
    !environment.production ? NgxsReduxDevtoolsPluginModule.forRoot() : [],
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
})
export class RootStoreModule {}
