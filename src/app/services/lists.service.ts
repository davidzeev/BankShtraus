import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Bank, Branch } from '../models/BankBranch.model';
import { KeyValue } from '@angular/common';
import { Role } from '../models/enums.model';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private apiService: ApiService) { }

  public getBanks(): Observable<Bank[]> {
    return this.apiService.getBanks();
  }

  public getBranches(bankId: number): Observable<Branch[]> {
    return this.apiService.getBranches(bankId);
  }

  public getTransferPurposes(): KeyValue<number, string>[] {
    return this.transferPurposes;
  }

  public getQaGroups(): KeyValue<string, string>[] {
    return this.qaGroup;
  }

  public getRoles(): KeyValue<string, number>[] {
    return this.roles;
  }

  private readonly transferPurposes: KeyValue<number, string>[] = [
    { "key": 1, "value": "תשלום" },
    { "key": 2, "value": "שכר דירה" },
    { "key": 3, "value": "החזר חוב" },
    { "key": 4, "value": "הלוואה" },
    { "key": 5, "value": "ועד בית" },
    { "key": 6, "value": "מזונות" },
    { "key": 7, "value": "משכורת" },
    { "key": 8, "value": "קרוב משפחה" },
    { "key": 9, "value": "שכר לימוד" },
    { "key": 10, "value": "מיסי חבר" },
    { "key": 11, "value": "תרומה" },
    { "key": 99, "value": "אחר" }
  ];

  // private readonly transferPurposes: KeyValue<string, number>[] = [
  //   { "key": "תשלום", "value": 1 },
  //   { "key": "שכר דירה", "value": 2 },
  //   { "key": "החזר חוב", "value": 3 },
  //   { "key": "הלוואה", "value": 4 },
  //   { "key": "ועד בית", "value": 5 },
  //   { "key": "מזונות", "value": 6 },
  //   { "key": "משכורת", "value": 7 },
  //   { "key": "קרוב משפחה", "value": 8 },
  //   { "key": "שכר לימוד", "value": 9 },
  //   { "key": "מיסי חבר", "value": 10 },
  //   { "key": "תרומה", "value": 11 },
  //   { "key": "אחר", "value": 99 }
  // ];


  private readonly qaGroup: KeyValue<string, string>[] = [
    { "key": "ללא קבוצה", "value": "" },
    { "key": "QA1", "value": "QA1" },
    { "key": "QA2", "value": "QA2" },
    { "key": "QA3", "value": "QA3" },
    { "key": "QA4", "value": "QA4" },
    { "key": "QA5", "value": "QA5" },
    { "key": "QA6", "value": "QA6" },
    { "key": "QA7", "value": "QA7" },
    { "key": "QA8", "value": "QA8" },
    { "key": "QA9", "value": "QA9" },
    { "key": "QA10", "value": "QA10" },
    { "key": "QAAdmin", "value": "QAAdmin" }
  ];

  private readonly roles: KeyValue<string, number>[] = [
    { "key": "סטודנט", "value": Role.regular },
    { "key": "מנהל", "value": Role.admin }
  ];
}
