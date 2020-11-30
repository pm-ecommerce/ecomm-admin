import { ToastrService } from 'ngx-toastr';
import { EmployeeUpdate } from './../../../entities/employeesUpdate';
import { ApiResponse } from './../../../shared/api-response';
import { Employee } from './../../../entities/employee';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './../../../services/modal.service';
import { SortDescriptor, State, orderBy } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { EmployeeService } from './../../../services/employee/employee.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PagedResponse } from "../../../entities/paged-response";

@Component({
  selector: 'employeeList',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true })
  public dataBinding: DataBindingDirective;

  public gridData: any;
  employee: Employee;
  @ViewChild('form', { static: true })
  public form: TemplateRef<any>;

  public sort: SortDescriptor[] = [
    {
      field: 'name',
      dir: 'asc'
    }
  ];
  public gridView: any;
  public state: State = {
    skip: 0
  };
  public pageType: string;


  constructor(private service: EmployeeService, private modal: ModalService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.gridView = {
      skip: 0,
      pageSize: 15,
      row: 30,
      height: 740,
      scroll: 'virtual',
      sortable: {
        allowUnsort: true,
        multiple: false
      }
    };
    this.gridData = {
      data: []
    };


    this.route.params.subscribe(params => {
      this.loadEmployee();
    });
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data: orderBy(this.gridView.data, this.sort),
      total: this.gridView.data.length
    };
  }

  public loadEmployee(page = 1) {
    const url = `?currentPage=${page}`;
    this.service.getAll(url)
      .subscribe(
        (response: ApiResponse<PagedResponse<Employee>>) => {
          console.log(response.data.data);
          this.gridData.data = response.data.data;
        }
      );

    this.gridView = this.gridData;
  }

  employeeForm(employee: Employee = {} as Employee) {
    this.employee = new Employee(employee);
    console.log(this.employee);
    this.modal.open(this.form, 'modal-lg');
  }

  delete(employee: Employee = {} as Employee) {
    const subscription$ = this.service.delete(employee.id)
      .subscribe(
        (response: ApiResponse<Employee>) => {
          subscription$.unsubscribe();
          // alert('Successfully deleted');
          this.toastr.success(response.message || 'Successfully deleted.');
          this.gridData.data.splice(this.gridData.data.indexOf(response.data), 1);
        },
        (error: ApiResponse<Employee>) => {
          subscription$.unsubscribe();
          this.toastr.success(error.message || 'An unexpected error has occured.');
        }
      );
  }

  save() {
    console.log(this.employee);
    if (!this.employee.id || this.employee.id == 0) {
      const subscription$ = this.service.create(this.employee)
        .subscribe(
          (response: ApiResponse<Employee>) => {
            subscription$.unsubscribe();
            this.gridData.data.push(response.data);
            this.close();
            // alert('Successfully created');
            this.toastr.success(response.message || 'Successfully created.');
          },
          (error: ApiResponse<Employee>) => {
            subscription$.unsubscribe();
            this.toastr.error(error.message || 'An unexpected error has occured.');
          }
        );
    } else {
      let employeeUpdate = new EmployeeUpdate(this.employee);
      console.log(employeeUpdate);
      const subscription$ = this.service.patch('/' + this.employee.id, employeeUpdate)
        .subscribe(
          (response: ApiResponse<Employee>) => {
            subscription$.unsubscribe();
            this.gridData.data = this.gridData.data.map(data => {
              if (data.id === this.employee.id) {
                return response.data;
              }
              return data;
            });
            this.close();
            this.toastr.success(response.message || 'Successfully updated.');
          },
          (error: ApiResponse<Employee>) => {
            subscription$.unsubscribe();
            console.log(error);
            this.toastr.error(error.message || 'An unexpected error has occured.');
          }
        );
    }
  }

  close() {
    this.modal.close();
  }

  ngOnInit() {
    this.loadEmployee(1);
  }
}
