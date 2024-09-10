import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ListItem, ListItemModel, ListResponse } from '../common/list.interface';
import { ApiService } from '../../../core/api/services/api.service';
import { EnvironmentService } from '../../../core/environments/services/environment.service';

@Injectable()
export class ListApiService {
  constructor(private readonly apiService: ApiService, private readonly environmentService: EnvironmentService) { }

  public loadList(): Observable<ListResponse> {
    return this.apiService.get<ListResponse>(`${this.apiRoute}/tasks`);
  }

  public loadOneListItem(id: string): Observable<ListItem> {
    return this.apiService.get<ListItem>(`${this.apiRoute}/tasks/${id}`);
  }

  public createListItem(data: ListItemModel): Observable<ListItem> {
    return this.apiService.post<ListItem>(`${this.apiRoute}/tasks`, data);
  }

  public updateListItem(itemId: string, data: ListItemModel): Observable<ListItem> {
    return this.apiService.put<ListItem>(`${this.apiRoute}/tasks/${itemId}`, data);
  }

  public deleteListItem(itemId: string): Observable<unknown> {
    return this.apiService.delete<unknown>(`${this.apiRoute}/tasks/${itemId}`);
  }

  private get apiRoute(): string {
    return this.environmentService.environments.api;
  }
}
