import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { RouterNavigation } from '@ngxs/router-plugin';
import { MetaService } from './core/meta/services/meta.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private actions$: Actions, private metaService: MetaService) {
    this.actions$.pipe(ofActionSuccessful(RouterNavigation)).subscribe((data) => {
      // @ts-ignore
      const { meta } = data.routerState?.data ?? {};
      this.metaService.update(
        {
          url: data.event.url,
          ...meta
        }
      );
    });
  }
}
