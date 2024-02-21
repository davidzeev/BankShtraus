import { Injectable } from '@angular/core';
import { User, loginUser } from '../models/user.model';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user!: User;
  constructor(private ApiSrv: ApiService) { }

  public login(loginUser: loginUser): Observable<User> {
    return this.ApiSrv.login(loginUser).pipe(tap((resultData) => {
      this.user = resultData;
    }));
  }
}
