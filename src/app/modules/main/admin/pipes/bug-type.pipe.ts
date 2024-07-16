import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bugType'
})
export class BugTypePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 1:
        return 'לקוח';
      case 2:
        return 'שרת';
      default:
        return 'לא ידוע';
    }
  }
}
