import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessages'
})
export class ErrorMessagesPipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string {
    if (!errors) {
      return '';
    }

    if (errors['required']) {
      return 'שדה חובה';
    } else if (errors['minlength']) {
      return `אורך מינימלי: ${errors['minlength'].requiredLength}`;
    } else if (errors['maxlength']) {
      return `אורך מקסימלי: ${errors['maxlength'].requiredLength}`;
    } else if (errors['email']) {
      return 'כתובת דוא"ל לא תקינה';
    } else if (errors['pattern']) {
      return 'הערך אינו תואם את התבנית הנדרשת';
    } else if (errors['max']) {
      return `הערך המקסימלי הוא: ${errors['max'].max}`;
    } else if (errors['min']) {
      return `הערך המינימלי הוא: ${errors['min'].min}`;
    } else if (errors['maxDigits']) {
      return `יש להזין עד: ${errors['maxDigits'].max} ספרות`;
    } else if (errors['passwordPattern']) {
      return `${errors['passwordPattern']}`;
    }

    return 'שגיאה לא ידועה';
  }
}
