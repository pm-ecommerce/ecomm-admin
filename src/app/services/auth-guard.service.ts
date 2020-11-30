import {AuthService} from './login.service';
import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: AuthService, private router: Router) {
  }

  canActivate(route, state: RouterStateSnapshot) {
    return this.service.isLoggedIn();
  }
}
