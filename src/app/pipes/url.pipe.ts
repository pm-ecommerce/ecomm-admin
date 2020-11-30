import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../environments/environment';

@Pipe({
  name: 'url',
  pure: true
})
export class UrlPipe implements PipeTransform {
  public transform(value: any, withToken = false): any {
    const path = value.split('/').filter(s => s && s.length > 0).join('/');
    if (!withToken) {
      return environment.baseUrl + path;
    }

    return environment.baseUrl + path + '?token=' + localStorage.getItem('token');
  }
}
