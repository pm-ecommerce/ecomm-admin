import {AuthService} from '../../../services/login.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiResponse} from '../../../shared/api-response';
import {Login} from '../../../entities/logininfo';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: AuthService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
    console.log(this.toastr);
  }

  invalidLogin = false;

  signIn(credentials) {
    const login = new Login(credentials);
    const subs$ = this.service.signIn(login)
      .subscribe(
        (response) => {
          if (response) {
            let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            subs$.unsubscribe();
            // this.router.navigate([returnUrl || '/']);
            document.location.reload();
          } else {
            this.invalidLogin = true;
            this.toastr.error('Unable to authenticate.');
          }
          subs$.unsubscribe();
        }, (error: ApiResponse<any>) => {
          this.toastr.error(error.message || 'Unable to authenticate.');
          subs$.unsubscribe();
        }
      );
  }

  ngOnInit() {
  }

}
