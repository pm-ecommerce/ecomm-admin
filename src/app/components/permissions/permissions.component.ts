import {ToastrService} from 'ngx-toastr';
import {SortDescriptor, State, orderBy} from '@progress/kendo-data-query';
import {DataBindingDirective} from '@progress/kendo-angular-grid';
import {ActivatedRoute} from '@angular/router';
import {ApiResponse} from './../../shared/api-response';
import {PermissionsService} from './../../services/permissions.service';
import {ModalService} from './../../services/modal.service';
import {Permission} from './../../entities/permission';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  constructor(private service: PermissionsService, private modal: ModalService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.permissions = {
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
    this.route.params.subscribe(params => {
      this.pageType = params.type;
      this.loadProducts();
    });
  }

  @ViewChild(DataBindingDirective, {static: true})
  public dataBinding: DataBindingDirective;
  @ViewChild('form', {static: true})
  public form: TemplateRef<any>;
  public permissions;
  public permission: Permission;
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

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data: orderBy(this.gridView.data, this.sort),
      total: this.gridView.data.length
    };
  }

  save() {
    console.log(this.permission);
    if (!this.permission.id || this.permission.id == 0) {
      console.log('inside save');
      const subscription$ = this.service.create(this.permission)
        .subscribe(
          (response: ApiResponse<Permission>) => {
            subscription$.unsubscribe();
            this.permissions.data.push(response.data);
            this.close();
            this.toastr.success(response.message || 'Successfully created.');
          },
          (error: ApiResponse<Permission>) => {
            this.toastr.error(error.message || 'An unexpected error has occured.');
            subscription$.unsubscribe();
          }
        );
    } else {
      const subscription$ = this.service.patch('/' + this.permission.id, this.permission)
        .subscribe(
          (response: ApiResponse<Permission>) => {
            subscription$.unsubscribe();
            this.permissions.data = this.permissions.data.map(data => {
              if (data.id === this.permission.id) {
                return response.data;
              }
              return data;
            });
            this.close();
            this.toastr.success(response.message || 'Successfully updated.');
          },
          (error: ApiResponse<Permission>) => {
            subscription$.unsubscribe();
            this.toastr.error(error.message || 'An unexpected error has occured.');
          }
        );
    }
  }

  delete(id) {
    const subs$ = this.service.delete(id)
      .subscribe(
        (response: ApiResponse<Permission>) => {
          this.toastr.success(response.message || 'Sucessfully deleted.');
          subs$.unsubscribe();
          this.permissions.data.splice(this.permissions.data.indexOf(response.data), 1);
        },
        (error: ApiResponse<Permission>) => {
          this.toastr.error(error.message || 'An unexpected error has occured.');
          subs$.unsubscribe();
        }
      );
  }

  permForm(perm: Permission = {} as Permission) {
    this.permission = new Permission(perm);
    this.modal.open(this.form, 'modal-lg');
  }

  ngOnInit() {

  }

  public close() {
    this.modal.close();
  }

  loadProducts(page = 1) {
    let url = '';
    url += `?currentPage=${page}`;

    const subscribe$ = this.service.getAll(url)
      .subscribe(
        (response: ApiResponse<Permission>) => {
          this.permissions = response.data;
          subscribe$.unsubscribe();
        },
        (error: ApiResponse<Permission>) => {
          this.toastr.error(error.message || 'An unexpected error has occured.');
          subscribe$.unsubscribe();
        }
      );
  }

}
