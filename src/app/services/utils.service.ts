import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from './spinner.service';

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
}
