import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropdownButtonDirective, NzDropDownDirective, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { ListComponent } from './list.component';
import { ListRoutingModule } from './list-routing.module';
import { CreateEditListItemComponent } from './components/create-edit-list-item/create-edit-list-item.component';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NzFormModule,
} from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [ListComponent, CreateEditListItemComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    NzFlexDirective,
    NzButtonModule,
    NzIconDirective,
    NzTableModule,
    NzDropDownDirective,
    NzDropdownButtonDirective,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzModalModule,
    NzSpinComponent,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
  ],
})
export class ListModule { }
