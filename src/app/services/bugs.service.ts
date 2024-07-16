// bugs.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { BugDTO, AccountBug, UpdateAccountBugsDTO, BugsAndBugsAccountDTO } from '../models/Bugs.model';

@Injectable({
  providedIn: 'root'
})
export class BugsService {

  constructor(private apiService: ApiService) { }

  public getBugList(): Observable<BugDTO[]> {
    return this.apiService.getBugList();
  }

  public updateBug(id: string, bug: BugDTO): Observable<any> {
    return this.apiService.updateBug(id, bug);
  }

  public getUserBugs(accountNumber: number): Observable<AccountBug[]> {
    return this.apiService.getUserBugs(accountNumber);
  }

  public updateBugsAccount(updateAccountBugsDto: UpdateAccountBugsDTO): Observable<any> {
    return this.apiService.updateBugsAccount(updateAccountBugsDto);
  }

  public getBugsAndBugsAccount(accountNumber: number): Observable<BugsAndBugsAccountDTO> {
    return this.apiService.getBugsAndBugsAccount(accountNumber);
  }

}
