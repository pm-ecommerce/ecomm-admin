import { ToastrService } from 'ngx-toastr';
import { SortDescriptor, State, orderBy } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { ApiResponse } from '../../shared/api-response';
import { ModalService } from '../../services/modal.service';
import { Role } from '../../entities/role';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true })
  public dataBinding: DataBindingDirective;

  @ViewChild('form', { static: true })
  public form: TemplateRef<any>;

  public roles: any;
  public role: Role;
  public sort: SortDescriptor[] = [
    {
      field: 'name',
      dir: 'asc'
    }
  ];
  public pageType: string;
  public gridView: any;
  public state: State = {
    skip: 0
  };

  constructor(private service: RolesService, private modal: ModalService, private toastr: ToastrService) {
    this.roles = {
      data: []
    };
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
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data: orderBy(this.gridView.data, this.sort),
      total: this.gridView.data.length
    };
  }

  save() {
    console.log(this.role);
    if (!this.role.id || this.role.id === 0) {
      const subscription$ = this.service.create(this.role)
        .subscribe(
          (response: ApiResponse<Role>) => {
            subscription$.unsubscribe();
            this.roles.data.push(response.data);
            this.toastr.success(response.message || 'Successfully created.');
            this.close();
          },
          (error: ApiResponse<Role>) => {
            this.toastr.error(error.message || 'An unexpected error has occured.');
            subscription$.unsubscribe();
          }
        );
    } else {

      const subscription$ = this.service.patch('/' + this.role.id, this.role)
        .subscribe(
          (response: ApiResponse<Role>) => {
            subscription$.unsubscribe();
            this.roles.data = this.roles.data.map(data => {
              if (data.id === this.role.id) {
                return response.data;
              }
              return data;
            });
            this.close();
            this.toastr.success(response.message || 'Successfully updated.');
          },
          (error: ApiResponse<Role>) => {
            subscription$.unsubscribe();
            this.toastr.error(error.message || 'An unexpected error has occured.');
          }
        );
    }
  }

  public loadRoles(page = 1) {
    let url = '';
    url += `?currentPage=${page}`;
    const subscribe$ = this.service.getAll(url)
      .subscribe(
        (response: ApiResponse<Role>) => {
          this.roles = response.data;
          subscribe$.unsubscribe();
        },
        (error: ApiResponse<Role>) => {
          this.toastr.error(error.message || 'An unexpected error has occured.');
          subscribe$.unsubscribe();
        }
      );
  }

  public close() {
    this.modal.close();
  }

  public roleForm(role: Role = {} as Role) {
    this.role = new Role(role);
    this.modal.open(this.form, 'modal-lg');
  }

  public delete(id) {
    const subs$ = this.service.delete(id)
      .subscribe(
        (response: ApiResponse<Role>) => {
          this.roles.data.splice(this.roles.data.indexOf(response.data), 1);
          this.toastr.success(response.message || 'Successfully deleted.');
          subs$.unsubscribe();
        },
        (error: ApiResponse<Role>) => {
          this.toastr.error(error.message || 'An unexpected error has occured.');
          subs$.unsubscribe();
        }
      );
  }

  ngOnInit() {
    this.loadRoles();
  }

}
