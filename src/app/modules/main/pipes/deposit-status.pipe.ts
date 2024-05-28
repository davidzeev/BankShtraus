import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'depositStatus'
})
export class DepositStatusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch (value) {
      case 1:
        return 'פעיל';
      case 2:
        return 'הושלם בזמן';
      case 3:
        return 'בוטל מוקדם';
      case 4:
        return 'בוטל בתחנת יציאה';
      default:
        return 'לא ידוע';
    }
  }
}
