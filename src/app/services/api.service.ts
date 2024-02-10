import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginUser } from '../models/user.model';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly urlApi = "https://localhost:7208/api/"

  constructor(private httpClient: HttpClient) { }

  public login(userLogin: loginUser): Observable<any> {
    const url = this.urlApi + "login";
    return this.httpClient.post<any>(url, userLogin);
  }
}