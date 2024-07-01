import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, finalize } from 'rxjs';
import { Account, CreateAccountRequestDTO, LoginAccount, UpdateAccountRequestDTO } from '../models/user.model';
import { Transaction, TransactionAccount } from '../models/TransferData.model';
import { SpinnerService } from './spinner.service';
import { Bank, Branch } from '../models/BankBranch.model';
import { BankTransferDTO } from '../models/BankTransfer.model';
import { DepositTypeDTO, DepositsAccountDTO, DepositsDTO } from '../models/Deposits.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiUrl = "https://localhost:7208/api"

  constructor(private httpClient: HttpClient, private spinnerService: SpinnerService) { }

  public login(loginAccount: LoginAccount): Observable<any> {
    const url = this.apiUrl + "/accounts/login";
    this.spinnerService.startLoading();
    return this.httpClient.post<any>(url, loginAccount).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }

  public createAccount(account: CreateAccountRequestDTO): Observable<Account> {
    const url = `${this.apiUrl}/accounts/CreateAccount`;
    this.spinnerService.startLoading();
    return this.httpClient.post<Account>(url, account).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }

  public updateAccount(accountNumber: number, account: UpdateAccountRequestDTO): Observable<any> {
    const url = `${this.apiUrl}/accounts/UpdateAccount/${accountNumber}`;
    this.spinnerService.startLoading();
    return this.httpClient.put<any>(url, account).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }

  public deleteAccount(accountNumber: number): Observable<any> {
    const url = `${this.apiUrl}/accounts/DeleteAccount/${accountNumber}`;
    this.spinnerService.startLoading();
    return this.httpClient.delete<any>(url).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }

  public getAllAccounts(): Observable<Account[]> {
    const url = `${this.apiUrl}/accounts`;
    this.spinnerService.startLoading();
    return this.httpClient.get<Account[]>(url).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }

  public getAccount(accountNumber: number): Observable<Account> {
    const url = `${this.apiUrl}/accounts/${accountNumber}`;
    this.spinnerService.startLoading();
    return this.httpClient.get<Account>(url).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }

  public getTransaction(querySearch: TransactionAccount): Observable<Transaction[]> {
    const url = this.apiUrl + "/transactions";
    this.spinnerService.startLoading();
    return this.httpClient.post<any>(url, querySearch).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }

  public getBanks(): Observable<Bank[]> {
    const url = `${this.apiUrl}/Lists/banks`;
    return this.httpClient.get<Bank[]>(url).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }

  public getBranches(bankId: number): Observable<Branch[]> {
    const url = `${this.apiUrl}/Lists/branches/${bankId}`;
    return this.httpClient.get<Branch[]>(url).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }

  public performBankTransfer(bankTransferObj: BankTransferDTO): Observable<any> {
    const url = `${this.apiUrl}/BankTransfer`;
    return this.httpClient.post<any>(url, bankTransferObj).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }

  // הוספת הפקדה
  public addDeposit(deposit: DepositsDTO): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/Deposits`, deposit).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }

  // ביטול הפקדה
  public cancelDeposit(depositId: number): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/Deposits/CancelDeposit/${depositId}`, null).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }

  // קבלת כל הפקדות החשבון
  public getAllDepositsAccount(accountNumber: number): Observable<DepositsAccountDTO[]> {
    return this.httpClient.get<DepositsAccountDTO[]>(`${this.apiUrl}/Deposits/GetAllDepositsAccount/${accountNumber}`).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }

  // קבלת רשימת סוגי ההפקדות
  public getDepositsTypeList(): Observable<DepositTypeDTO[]> {
    return this.httpClient.get<DepositTypeDTO[]>(`${this.apiUrl}/Deposits/GetDepositsTypeList`).pipe(
      finalize(() => this.spinnerService.stopLoading())
    );
  }
}
