import {Employee} from './../../../entities/employee';
import {ApiResponse} from './../../../shared/api-response';
import {EmployeeService} from './../../../services/employee/employee.service';
import {Permission} from './../../../entities/permission';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent implements OnInit {

  @Input() permission: Permission;

  constructor(private service: EmployeeService) {
  }

  public actions: any[] = ['any', '*', 'get', 'post', 'put', 'patch', 'delete'].map(e => e.toUpperCase());

  ngOnInit() {
  }

  save() {
    console.log(this.permission);
    if (!this.permission.id || this.permission.id == 0) {
      const subscription$ = this.service.create(this.permission)
        .subscribe(
          (response: ApiResponse<Permission>) => {
            subscription$.unsubscribe();
            alert('Successfully created');
            // this.gridData.data.push(response.data);
            // this.close();
          },
          (error: ApiResponse<Permission>) => {
            subscription$.unsubscribe();
          }
        );
    } else {
      const subscription$ = this.service.update('', this.permission)
        .subscribe(
          (response: ApiResponse<Permission>) => {
            subscription$.unsubscribe();
            // this.gridData = this.gridData.map(data => {
            //   if (data.id === this.permission.id) {
            //     return response.data;
            //   }
            //   return data;
            // });
            // this.close();
            alert('Successfully updated');
          },
          (error: ApiResponse<Employee>) => {
            subscription$.unsubscribe();
          }
        );
    }
  }
}
