import {Profile} from './../entities/profile';
import {ApiResponse} from './../shared/api-response';

import {HttpClient} from '@angular/common/http';
import {DaoService} from './base/dao.service';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends DaoService {

  private helper = new JwtHelperService();

  constructor(http: HttpClient) {
    super(`${environment.authUrl}/api/employees/login`, http);
  }

  signIn(credentials) {
    return this.login('', credentials)
      .pipe(
        map((response: ApiResponse<any>) => {
          if (response && response.status === 200) {
            localStorage.setItem('token', response.data['token']);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    document.location.href = "/";
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const user = this.getCurrentUser();
    if (!user || user.type !== 'employee') {
      return false;
    }
    return !this.helper.isTokenExpired(token);
  }

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return this.helper.decodeToken(token);
  }

  changePassword(profile: Profile) {
    return this.patch('', profile);
  }
}
