import {Role} from '../../../entities/role';
import {ApiResponse} from '../../../shared/api-response';
import {Employee} from '../../../entities/employee';
import {EmployeeService} from '../../../services/employee/employee.service';

import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RolesService} from 'src/app/services/roles.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: EmployeeService, private rservice: RolesService, private router: Router) {
  }

  @Input() public employee: Employee;

  public roles = [];

  public getEmployeeDetails() {
    const subscription$ = this.service.get(this.employee.id).subscribe((res: ApiResponse<Employee>) => {
      if (res.status === 200) {
        this.employee.role = res.data.role;
      }
      subscription$.unsubscribe();
    }, err => {
      console.log(err);
      subscription$.unsubscribe();
    });
  }

  byId(a, b) {
    return a && b && a.id === b.id;
  }

  ngOnInit() {
    if (this.employee && this.employee.id > 0) {
      this.getEmployeeDetails();
    }

    this.rservice.getAll('')
      .subscribe(
        (response: ApiResponse<Role>) => {
          this.roles = response.data['data'];
        }
      );
  }
}
