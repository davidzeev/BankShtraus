import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginAccount } from '../models/user.model';
import { transaction, transactionAccount } from '../models/TransferData.model';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly urlApi = "https://localhost:7208/api/"

  constructor(private httpClient: HttpClient, private spinnerService: SpinnerService) { }

  public login(loginAccount: LoginAccount): Observable<any> {
    const url = this.urlApi + "login";
    this.spinnerService.startLoading();
    return this.httpClient.post<any>(url, loginAccount).pipe(tap(() => {
      this.spinnerService.stopLoading();
    }));
  }

  public getTransaction(querySearch: transactionAccount): Observable<transaction[]> {
    const url = this.urlApi + "transaction";
    this.spinnerService.startLoading();
    return this.httpClient.post<any>(url, querySearch).pipe(tap(() => {
      this.spinnerService.stopLoading();
    }));
  }
}