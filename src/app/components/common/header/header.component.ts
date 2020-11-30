import {ToastrService} from 'ngx-toastr';
import {EmployeeService} from '../../../services/employee/employee.service';
import {ApiResponse} from '../../../shared/api-response';
import {Profile} from '../../../entities/profile';
import {ModalService} from '../../../services/modal.service';
import {AuthService} from '../../../services/login.service';
import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ExtJsService} from '../../../services/ext-js.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('form', {static: true})
  public form: TemplateRef<any>;

  public username = 'Admin';
  public profile: Profile;

  constructor(public app: ExtJsService, private lservice: AuthService, private service: EmployeeService, private modal: ModalService, private toastr: ToastrService) {
  }

  public logout() {
    this.lservice.logout();
  }

  public ngOnInit(): void {
    this.profile = new Profile(this.lservice.getCurrentUser());
    this.username = this.lservice.getCurrentUser().name || 'Admin';
  }

  close() {
    this.modal.close();
  }

  public changePasswordForm() {
    this.modal.open(this.form, 'modal-lg');
  }

  save() {
    const payload = {...this.profile, role: {}};
    const subs$ = this.service.patch('/' + this.profile.id + '/update-password/', payload)
      .subscribe(
        (response: ApiResponse<any>) => {
          subs$.unsubscribe();
          this.toastr.success(response.message || 'Successfully updated.');
          this.close();
        },
        (error: ApiResponse<any>) => {
          this.toastr.error(error.message || 'An unexpected error has occured.');
          subs$.unsubscribe();
          this.close();
        }
      );
  }
}
