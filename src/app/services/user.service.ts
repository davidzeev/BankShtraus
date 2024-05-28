import { Inject, Injectable } from '@angular/core';
import { Account, LoginAccount } from '../models/user.model';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';
import { Role } from '../models/enums.model';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private account: Account | null = null;
  private sessionStorage: Storage | undefined
  private readonly ACCOUNT_KEY = 'user_account'; // מפתח לשמירה ב local storage

  constructor(private ApiSrv: ApiService, @Inject(DOCUMENT) document: Document) {
    this.sessionStorage = document.defaultView?.sessionStorage;

    const storedAccount = this.sessionStorage?.getItem(this.ACCOUNT_KEY);
    if (storedAccount) {
      this.account = JSON.parse(storedAccount);
    }
  }

  public login(loginAccount: LoginAccount): Observable<Account> {
    return this.ApiSrv.login(loginAccount).pipe(tap((resultAccount: Account) => {
      this.account = resultAccount;
      this.saveAccountToLocal(); // שמירת החשבון ל-local storage בכל התחברות מוצלחת
    }));
  }

  public getAccountDetail(): Account | null {
    return this.account;
  }

  public logoutAccount(): void {
    this.account = null;
    this.sessionStorage?.removeItem(this.ACCOUNT_KEY);
  }

  public isLoginAccount(): boolean {
    return !!this.account;
  }

  public isAdminAccount(): boolean {
    return this.account?.role == Role.admin;
  }

  private saveAccountToLocal(): void {
    this.sessionStorage?.setItem(this.ACCOUNT_KEY, JSON.stringify(this.account));
  }
}
