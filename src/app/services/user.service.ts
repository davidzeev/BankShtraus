import { Injectable } from '@angular/core';
import { loginUser } from '../models/user.model';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private ApiSrv: ApiService) { }

  public login(loginUser: loginUser): Observable<any> {
    console.log(loginUser);
    return this.ApiSrv.login(loginUser).pipe(tap((resultData) => {
      console.log(resultData);
    }));
  }
}
