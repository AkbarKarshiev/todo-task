import { ListItemModel } from '../common/list.interface';

const ACTION_SCOPE = '[List]';

export namespace ListActions {
  export class LoadItems {
    static readonly type = `${ ACTION_SCOPE } Load Items`;
  }

  export class LoadOneItem {
    static readonly type = `${ ACTION_SCOPE } Load One Item`;

    constructor(public id: string) {
    }
  }

  export class CreateAnItem {
    static readonly type = `${ ACTION_SCOPE } Create An Item`;

    constructor(public payload: ListItemModel) {
    }
  }

  export class EditAnItem {
    static readonly type = `${ ACTION_SCOPE } Edit An Item`;

    constructor(public itemId: string, public data: ListItemModel) {
    }
  }

  export class DeleteAnItem {
    static readonly type = `${ ACTION_SCOPE } Delete An Item`;

    constructor(public id: string) {
    }
  }
}
