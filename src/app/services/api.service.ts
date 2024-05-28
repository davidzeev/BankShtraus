import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginAccount } from '../models/user.model';
import { Transaction, TransactionAccount } from '../models/TransferData.model';
import { SpinnerService } from './spinner.service';
import { Bank, Branch } from '../models/BankBranch.model';
import { BankTransferDTO } from '../models/BankTransfer.model';
import { DepositTypeDTO, DepositsAccountDTO, DepositsDTO } from '../models/Deposits.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiUrl = "https://localhost:7208/api"

  constructor(private httpClient: HttpClient, private spinnerService: SpinnerService) { }

  public login(loginAccount: LoginAccount): Observable<any> {
    const url = this.apiUrl + "/login";
    this.spinnerService.startLoading();
    return this.httpClient.post<any>(url, loginAccount).pipe(tap(() => {
      this.spinnerService.stopLoading();
    }));
  }

  public getTransaction(querySearch: TransactionAccount): Observable<Transaction[]> {
    const url = this.apiUrl + "/transaction";
    this.spinnerService.startLoading();
    return this.httpClient.post<any>(url, querySearch).pipe(tap(() => {
      this.spinnerService.stopLoading();
    }));
  }

  public getBanks(): Observable<Bank[]> {
    const url = `${this.apiUrl}/Lists/banks`;
    return this.httpClient.get<Bank[]>(url);
  }

  public getBranches(bankId: number): Observable<Branch[]> {
    const url = `${this.apiUrl}/Lists/branches/${bankId}`;
    return this.httpClient.get<Branch[]>(url);
  }

  public performBankTransfer(bankTransferObj: BankTransferDTO): Observable<any> {
    const url = `${this.apiUrl}/BankTransfer`;
    return this.httpClient.post<any>(url, bankTransferObj).pipe(tap(() => {
      this.spinnerService.stopLoading();
    }));
  }

  // הוספת הפקדה
  public addDeposit(deposit: DepositsDTO): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/Deposits`, deposit);
  }

  // ביטול הפקדה
  public cancelDeposit(depositId: number): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/Deposits/CancelDeposit/${depositId}`, null);
  }

  // קבלת כל הפקדות החשבון
  public getAllDepositsAccount(accountNumber: number): Observable<DepositsAccountDTO[]> {
    return this.httpClient.get<DepositsAccountDTO[]>(`${this.apiUrl}/Deposits/GetAllDepositsAccount/${accountNumber}`);
  }

  // קבלת רשימת סוגי ההפקדות
  public getDepositsTypeList(): Observable<DepositTypeDTO[]> {
    return this.httpClient.get<DepositTypeDTO[]>(`${this.apiUrl}/Deposits/GetDepositsTypeList`);
  }
}