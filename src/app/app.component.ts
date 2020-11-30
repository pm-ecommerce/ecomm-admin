import {AuthService} from './services/login.service';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecomm-Admin';
  loading = false;
  isLogged = false;

  constructor(public authService: AuthService) {
    this.isLogged = authService.isLoggedIn();
  }

}
