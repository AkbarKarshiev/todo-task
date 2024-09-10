import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';

import { CreateEditModalInput, ListItem, ListItemFieldKeys, ListItemModel } from '../../common/list.interface';
import { ListState } from '../../state/list.state';
import { ListActions } from '../../state/list.actions';
import { filterNullish } from '../../../../core/common/utils/helper-functions';
import { uniqueTaskTitleValidator } from '../../validators/unique-task';

enum FormType {
  CREATE = 'create',
  EDIT = 'edit',
}

@Component({
  selector: 'app-create-edit-list-item',
  templateUrl: './create-edit-list-item.component.html',
  styleUrl: './create-edit-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditListItemComponent implements OnInit {
  public readonly loading$: Observable<boolean> = this.store.select(ListState.getEditItemLoading);
  public readonly item$: Observable<any> = this.store.select(ListState.getEditingItem);

  public readonly formFieldKeys = ListItemFieldKeys;
  public formType: FormType = FormType.CREATE;
  public readonly taskForm = new FormGroup({
    [ListItemFieldKeys.Title]: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [uniqueTaskTitleValidator(this.store)],
      updateOn: 'blur',
    }),
    [ListItemFieldKeys.Description]: new FormControl(''),
  });

  constructor(
    private readonly store: Store,
    @Inject(NZ_MODAL_DATA) private readonly modalData: CreateEditModalInput,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.formType = this.modalData.item_id ? FormType.EDIT : FormType.CREATE;

    if (this.formType === FormType.EDIT) {
      this.store.dispatch(new ListActions.LoadOneItem(String(this.modalData.item_id)));

      this.item$.pipe(filterNullish(), take(1)).subscribe({
        next: (item: ListItem): void => {
          this.taskForm.patchValue({
            [ListItemFieldKeys.Title]: item.title,
            [ListItemFieldKeys.Description]: item.description,
          });
          this.cdr.markForCheck();
        }
      });
    }

  }

  public onSubmit(): void {
    if (this.taskForm.invalid) return;

    const data = this.getSubmitData();

    if (this.formType === FormType.CREATE) {
      this.store.dispatch(new ListActions.CreateAnItem(data)).pipe();
    } else {
      this.store.dispatch(new ListActions.EditAnItem(String(this.modalData.item_id), data));
    }
  }

  private getSubmitData(): Omit<ListItemModel, 'completed'>  {
    return {
      title: this.taskForm.get(ListItemFieldKeys.Title)?.value ?? '',
      description: this.taskForm.get(ListItemFieldKeys.Description)?.value ?? '',
    };
  }
}
