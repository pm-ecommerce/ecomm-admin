import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../environments/environment';

@Pipe({
  name: 'imageUrl',
  pure: true
})
export class ImageUrlPipe implements PipeTransform {
  public transform(value: string, withToken = false, baseUrl = false): any {
    const path = value.split('/').filter(s => s && s.length > 0).join('/');
    if (!withToken) {
      return (baseUrl ? environment.baseUrl : environment.imageUrl) + path;
    }

    return (baseUrl ? environment.baseUrl : environment.imageUrl) + path + '?token=' + localStorage.getItem('token');
  }
}
