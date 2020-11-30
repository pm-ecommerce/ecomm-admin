import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'slug',
  pure: true
})

export class SlugPipe implements PipeTransform {
  public transform(value: any, ...args): any {
    return value.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/$[^a-z0-9\-]#/g, '')
      .replace(/[\-+]/g, '-');
  }
}
