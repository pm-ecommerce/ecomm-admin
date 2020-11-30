import {ApiResponse} from '../../../shared/api-response';
import {ModalService} from '../../../services/modal.service';
import {Vendor} from '../../../entities/vendor';
import {Component, OnInit, ViewChild} from '@angular/core';
import {DataBindingDirective} from '@progress/kendo-angular-grid';
import {orderBy, SortDescriptor, State} from '@progress/kendo-data-query';
import {VendorService} from '../../../services/vendor.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-vendor-llist',
  templateUrl: './vendor-llist.component.html',
  styleUrls: ['./vendor-llist.component.scss']
})
export class VendorLlistComponent implements OnInit {
  @ViewChild(DataBindingDirective, {static: true})
  public dataBinding: DataBindingDirective;

  public gridData: any;

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


  constructor(private service: VendorService, private modal: ModalService, private route: ActivatedRoute, private toastr: ToastrService) {
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
      this.pageType = params.type;
      this.loadVendors();
    });
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data: orderBy(this.gridView.data, this.sort),
      total: this.gridView.data.length
    };
  }

  public approve(vendor: Vendor) {
    console.log(vendor);
    const subscription$ = this.service.patch(`/${vendor.id}/approve`)
      .subscribe(
        (response: ApiResponse<Vendor>) => {
          if (response.status === 200) {
            vendor.status = response.data.status;
            this.toastr.success(response.message);
            this.gridData.data.splice(this.gridData.data.indexof(response.data), 1);
          } else {
            this.toastr.error(response.message);
          }
          subscription$.unsubscribe();
        },
        (err) => {
          this.toastr.error(err.message || 'An unexpected error occurred.');
          subscription$.unsubscribe();
        }
      );
  }

  public disapprove(vendor: Vendor) {
    const subscription$ = this.service.patch(`/${vendor.id}/reject`)
      .subscribe(
        (response: ApiResponse<Vendor>) => {
          if (response.status === 200) {
            vendor.status = response.data.status;
            this.toastr.success(response.message);
            this.gridData.data.splice(this.gridData.data.indexof(response.data), 1);
          } else {
            this.toastr.error(response.message);
          }
          subscription$.unsubscribe();
        },
        (err) => {
          this.toastr.error(err.message || 'An unexpected error occurred.');
          subscription$.unsubscribe();
        }
      );
  }

  public loadVendors(page = 1) {
    let url = '';

    url += `?currentPage=${page}`;
    if (this.pageType && this.pageType === 'pending-approval') {
      url += '&status=1';
    }

    this.service.getAll(url)
      .subscribe(
        (response: ApiResponse<any>) => {
          this.gridData = response.data;
        }
      );
    this.gridView = this.gridData;
  }

  ngOnInit() {
  }

  newVendor() {
    window.location.href = environment.vendorRegistrationUrl;
  }
}
