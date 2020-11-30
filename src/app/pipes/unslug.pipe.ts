import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'unslug',
  pure: true
})

export class UnSlugPipe implements PipeTransform {
  public transform(slug: string): string {
    return slug.split('-').map(str => {
      return str.charAt(0).toUpperCase() + str.substr(1);
    }).join(' ');
  }
}
