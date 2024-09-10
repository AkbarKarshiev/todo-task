import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Breakpoints } from '@angular/cdk/layout';
import { LayoutService } from './services/layout.service';
import { Observable } from 'rxjs';
import { PageLoaderService } from '../../core/services/page-loader.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  public readonly breakpoints = Breakpoints;
  public readonly loading$ = this.pageLoaderService.loading$;
  public readonly layoutTypes$: Observable<string> = this.layoutService.layoutType$;

  constructor(
    private readonly layoutService: LayoutService,
    private readonly pageLoaderService: PageLoaderService,
    ) {}
}
