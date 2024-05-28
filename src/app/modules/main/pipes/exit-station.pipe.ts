import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exitStation'
})
export class ExitStationPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {

    switch (value) {
      case 0:
        return `ללא תחנות יציאה`;
      default:
        return `בכל ${value} לחודש`;
    }
  }
}
