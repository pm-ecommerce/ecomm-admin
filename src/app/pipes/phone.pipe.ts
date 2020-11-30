import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phone',
  pure: true
})
export class PhonePipe implements PipeTransform {
  public transform(phone: any, ...args): any {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phone;
  }
}
