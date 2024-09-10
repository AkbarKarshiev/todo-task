import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ListApiModule } from '../api/list-api.module';
import { ListState } from './list.state';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [
    NzModalModule,
    ListApiModule,
    NgxsModule.forFeature([ListState]),
  ],
})
export class ListStateModule {}
