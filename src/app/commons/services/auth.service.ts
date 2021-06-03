import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRQLogin, IToken } from '../models/auth';
import { PathRest } from '../static/static';

//root global
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(login: IRQLogin): Observable<IToken> {
    return this.http.post<IToken>(PathRest.GET_LOGIN, login);
  }
}
