import { Pipe, PipeTransform } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Pipe({
  name: 'path',
  standalone: true
})
export class NavigationPathPipe implements PipeTransform {

  constructor(private readonly navigationService: NavigationService) {}

  transform(path: string, params?: Record<string, string | number>): string {
    const route = this.navigationService.getRoute(path, params);

    return route.length > 1 ? `/${route.slice(1).join('/')}` : `${route[0]}`;
  }
}
