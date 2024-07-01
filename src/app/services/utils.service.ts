import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from './spinner.service';
import { PasswordStrength } from '../models/enums.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private snackBar: MatSnackBar,
    private spinnerService: SpinnerService
  ) { }

  public getDatePlus(plusYears: number = 0, plusMonth: number = 0, plusDays: number = 0): Date {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear() + plusYears, currentDate.getMonth() + plusMonth, currentDate.getDate() + plusDays);
  }

  public FirstDayMonth(): Date {
    const date = new Date();
    date.setDate(1);
    return date;
  }

  public dateToStringFormat(date: Date): string {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  public handleServerError(error: any): void {
    const err: string = error.error ? error.error : "קרתה שגיאה";
    this.spinnerService.stopLoading();
    this.snackBar.open(err, 'סגור', {
      duration: 5000,
    });
  }

  public getPasswordStrength(password: string): PasswordStrength {
    const lengthCriteria = password.length >= 10;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const criteriaMet = [lengthCriteria, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars].filter(criterion => criterion).length;

    if (password.length < 6) {
      return PasswordStrength.VeryWeak;
    }

    switch (criteriaMet) {
      case 1:
      case 2:
        return PasswordStrength.Weak;
      case 3:
        return PasswordStrength.Medium;
      case 4:
        return PasswordStrength.Strong;
      case 5:
        return PasswordStrength.VeryStrong;
      default:
        return PasswordStrength.VeryWeak;
    }
  }
}
