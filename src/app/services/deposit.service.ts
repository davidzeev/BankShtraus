import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepositTypeDTO, DepositsAccountDTO, DepositsDTO } from '../models/Deposits.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  constructor(private apiService: ApiService) { }

  // הוספת הפקדה
  public addDeposit(deposit: DepositsDTO): Observable<any> {
    return this.apiService.addDeposit(deposit);
  }

  // ביטול הפקדה
  public cancelDeposit(depositId: number): Observable<any> {
    return this.apiService.cancelDeposit(depositId);
  }

  // קבלת כל הפקדות החשבון
  public getAllDepositsAccount(accountNumber: number): Observable<DepositsAccountDTO[]> {
    return this.apiService.getAllDepositsAccount(accountNumber);
  }

  // קבלת רשימת סוגי ההפקדות
  public getDepositsTypeList(): Observable<DepositTypeDTO[]> {
    return this.apiService.getDepositsTypeList();
  }
}
