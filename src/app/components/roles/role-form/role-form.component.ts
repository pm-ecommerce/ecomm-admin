import {ApiResponse} from '../../../shared/api-response';
import {Permission} from '../../../entities/permission';
import {Role} from '../../../entities/role';
import {Component, OnInit, Input} from '@angular/core';
import {RolesService} from 'src/app/services/roles.service';
import {PermissionsService} from 'src/app/services/permissions.service';
import {PagedResponse} from '../../../entities/paged-response';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  constructor(private service: RolesService, private pservice: PermissionsService) {
  }

  @Input() public role: Role;
  public permissions;

  fetchRoleDetails() {
    const subscription$ = this.service.get(this.role.id).subscribe((res: ApiResponse<Role>) => {
      if (res.status === 200) {
        this.role.permissions = res.data.permissions || [];
      }
      subscription$.unsubscribe();
    }, err => {
      subscription$.unsubscribe();
    });
  }

  ngOnInit() {

    if (this.role && this.role.id > 0) {
      this.fetchRoleDetails();
    }

    const subscription$ = this.pservice.getAll('?itemsPerPage=300')
      .subscribe(
        (response: ApiResponse<PagedResponse<Permission>>) => {
          subscription$.unsubscribe();
          this.permissions = response.data.data;
        },
        (error: ApiResponse<Permission>) => {
          subscription$.unsubscribe();
        }
      );
  }
}
