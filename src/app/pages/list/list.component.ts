import { ChangeDetectionStrategy, Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngxs/store';

import { CreateEditModalInput, ListItem } from './common/list.interface';
import { CreateEditListItemComponent } from './components/create-edit-list-item/create-edit-list-item.component';
import { ListState } from './state/list.state';
import { ListActions } from './state/list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  public listLoading$ = this.store.select(ListState.getLoading);
  public listItems$: Observable<Array<ListItem>> = this.store.select(ListState.getList);

  public readonly dateFormat: string = "dd/MM/yyyy 'at' HH:mm:ss";

  constructor(
    private readonly modal: NzModalService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new ListActions.LoadItems());
  }

  public onAdd(): void {
    this.modal.create<CreateEditListItemComponent, CreateEditModalInput>({
      nzTitle: 'Create Task',
      nzViewContainerRef: this.viewContainerRef,
      nzContent: CreateEditListItemComponent,
      nzData: { },
      nzFooter: null,
    });
  }

  public onEdit(id: number): void {
    this.modal.create<CreateEditListItemComponent, CreateEditModalInput>({
      nzTitle: 'Edit Task',
      nzViewContainerRef: this.viewContainerRef,
      nzContent: CreateEditListItemComponent,
      nzData: { item_id: id },
      nzFooter: null,
    });
  }

  onItemChecked(item: ListItem, checked: boolean): void {
    const itemId = String(item.id);
    this.store.dispatch(new ListActions.EditAnItem(itemId, { ...item, completed: Number(checked) }));
  }

  onItemDelete(id: number): void {
    this.store.dispatch(new ListActions.DeleteAnItem(String(id)));
  }
}
