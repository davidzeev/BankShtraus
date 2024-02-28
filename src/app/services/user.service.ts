import { Injectable } from '@angular/core';
import { Account, LoginAccount } from '../models/user.model';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';
import { Role } from '../models/enums.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private account!: Account;
  constructor(private ApiSrv: ApiService) { }

  public login(loginAccount: LoginAccount): Observable<Account> {
    return this.ApiSrv.login(loginAccount).pipe(tap((resultData: Account) => {
      this.account = resultData;
    }));
  }

  public getAccountDetail(): Account {
    return this.account;
  }

  public logoutAccount(): void {
    this.account.accountNumber = 0;
  }

  public isLoginAccount(): boolean {
    return this.account && this.account.accountNumber != 0;
  }

  public isAdminAccount(): boolean {
    return this.account && this.account.role == Role.admin;
  }
}