import { ListItem, ListResponse } from '../common/list.interface';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ErrorFactoryService } from '../../../core/errors/services/error-factory.service';
import { ListApiService } from '../api/list-api.service';
import { ListActions } from './list.actions';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NavigationService } from '../../../core/navigation/services/navigation.service';
import { NavigationPaths, PATHS } from '../../../core/navigation/common/navigation.interface';

export interface ListStateModel {
  loaded: boolean;
  loading: boolean;
  items: Array<ListItem>;
  editingItem: ListItem | null;
  editItemLoading: boolean;
}

@State<ListStateModel>({
  name: 'list',
  defaults: {
    loaded: false,
    loading: false,
    items: [],
    editingItem: null,
    editItemLoading: false,
  },
})
@Injectable()
export class ListState {
  @Selector()
  static getList(state: ListStateModel): Array<ListItem> {
    return state.items;
  }

  @Selector()
  static getEditingItem(state: ListStateModel) {
    return state.editingItem;
  }

  @Selector()
  static getLoading(state: ListStateModel) {
    return state.loading;
  }

  @Selector()
  static getEditItemLoading(state: ListStateModel) {
    return state.editItemLoading;
  }

  @Selector()
  static getLoaded(state: ListStateModel) {
    return state.loaded;
  }

  constructor(
    private readonly errorFactory: ErrorFactoryService,
    private readonly listApiService: ListApiService,
    private readonly message: NzMessageService,
    private readonly modalService: NzModalService,
    private readonly navigationService: NavigationService,
    @Inject(PATHS) private readonly paths: NavigationPaths,
  ) {}

  @Action(ListActions.LoadItems)
  public loadItems(ctx: StateContext<ListStateModel>) {
    const state = ctx.getState();
    ctx.setState({ ...state, loading: true });

    return this.listApiService.loadList().pipe(
      tap((response: ListResponse) => {
        ctx.setState({ ...state, items: response, loaded: true, loading: false });
      }),
      catchError((error: HttpErrorResponse) => {
        ctx.setState({ ...state, loaded: true, loading: false });
        this.handleError(error);
        return throwError(() => error);
      }),
    );
  }

  @Action(ListActions.LoadOneItem)
  public loadOneItem(ctx: StateContext<ListStateModel>, action: ListActions.LoadOneItem) {
    const state = ctx.getState();
    ctx.setState({ ...state, editItemLoading: true });

    return this.listApiService.loadOneListItem(action.id).pipe(
      tap((response: ListItem) => {
        ctx.setState({ ...state, editingItem: response, editItemLoading: false });
      }),
      catchError((error: HttpErrorResponse) => {
        ctx.setState({ ...state, editItemLoading: false });
        this.handleError(error);
        return throwError(() => error);
      }),
    );
  }

  @Action(ListActions.CreateAnItem)
  public createAnItem(ctx: StateContext<ListStateModel>, action: ListActions.CreateAnItem) {
    const state = ctx.getState();
    ctx.setState({ ...state, editItemLoading: true });

    return this.listApiService.createListItem(action.payload).pipe(
      tap((response: ListItem) => {
        response.completed = 0;
        ctx.setState(
          patch<ListStateModel>({
            items: append<ListItem>([response]),
            editItemLoading: false,
          })
        );
        this.modalService.closeAll();
      }),
      catchError((error: HttpErrorResponse) => {
        ctx.setState({ ...state, editItemLoading: false });
        this.handleError(error);
        return throwError(() => error);
      }),
    );
  }

  @Action(ListActions.EditAnItem)
  public editAnItem(ctx: StateContext<ListStateModel>, action: ListActions.EditAnItem) {
    const state = ctx.getState();
    ctx.setState({ ...state, editItemLoading: true, loading: true });

    return this.listApiService.updateListItem(action.itemId, action.data).pipe(
      tap((response: ListItem) => {
        ctx.setState(
          patch<ListStateModel>({
            items: updateItem<ListItem>((item) => item.id === response.id, response),
            editItemLoading: false,
            loading: false,
          }),
        );
        this.modalService.closeAll();
      }),
      catchError((error: HttpErrorResponse) => {
        ctx.setState({ ...state, editItemLoading: false, loading: false });
        this.handleError(error);
        return throwError(() => error);
      }),
    );
  }

  @Action(ListActions.DeleteAnItem)
  public deleteAnItem(ctx: StateContext<ListStateModel>, action: ListActions.DeleteAnItem) {
    const state = ctx.getState();
    ctx.setState({ ...state, loading: true });

    return this.listApiService.deleteListItem(action.id).pipe(
      tap(() => {
        ctx.setState(
          patch<ListStateModel>({
            items: removeItem<ListItem>((item) => String(item.id) === action.id),
            loading: false,
          })
        );
      }),
      catchError((error: HttpErrorResponse) => {
        ctx.setState({ ...state, loading: false });
        this.handleError(error);
        return throwError(() => error);
      }),
    );
  }

  private handleError(error: HttpErrorResponse) {
    const errorObj = this.errorFactory.fromResponse(error);
    const getErrorMsg = this.errorFactory.getErrorMessage(errorObj);
    this.message.error(getErrorMsg);

    if (this.errorFactory.isUnauthorizedError(errorObj)) {
      this.navigationService.navigate([this.paths.auth]).then();
    }
  }
}
