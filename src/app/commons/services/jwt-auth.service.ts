import { Injectable } from '@angular/core';
import { IJwt } from '../models/auth';
import { LocalStorageJwt } from '../static/local-storage';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtAuthService {
  constructor() {}

  login(token: string): void {
    const decode = jwt_decode<IJwt>(token);
    localStorage.setItem(LocalStorageJwt.LS_ACCESS_TOKEN, token);
    localStorage.setItem(LocalStorageJwt.LS_ROL, JSON.stringify(decode.role));
  }

  isLogged(): boolean {
    const role = localStorage.getItem(LocalStorageJwt.LS_ROL);
    if (!role) {
      return false;
    }
    const roles = JSON.parse(role) as Array<string>;
    if (roles.length == 0) {
      return false;
    }

    return true;
  }
}
