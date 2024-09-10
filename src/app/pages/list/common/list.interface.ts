export interface ListItem {
  id: number;
  user_id: number;
  title: string;
  description: string;
  completed: number;
  created_at: string;
  updated_at: string;
}

export type ListResponse = Array<ListItem>;

export interface CreateEditModalInput {
  item_id?: number;
}

export interface ListItemModel {
  title: string;
  description: string;
  completed?: number;
}

export enum ListItemFieldKeys {
  Title = 'title',
  Description = 'description',
}
