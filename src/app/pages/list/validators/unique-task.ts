import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ListState } from '../state/list.state';

export function uniqueTaskTitleValidator(store: Store): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return store.select(ListState.getList).pipe(
      map((tasks) => {
        const titleExists = tasks.some(task => task.title === control.value);
        return titleExists ? { titleExists: true } : null;
      }),
      catchError(() => of(null))
    );
  };
}
