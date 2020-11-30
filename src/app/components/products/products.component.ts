import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { orderBy, SortDescriptor, State } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { ApiResponse } from '../../shared/api-response';
import { Product } from '../../entities/product';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true })
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


  constructor(private service: ProductService, private modal: ModalService, private route: ActivatedRoute, private toastr: ToastrService) {
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
      console.log(this.pageType);
      this.loadProducts();
    });
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data: orderBy(this.gridView.data, this.sort),
      total: this.gridView.data.length
    };
  }

  public getPreviewUrl(item): string {
    return `http://localhost:3000/preview/${item.slug}`;
  }

  public approve(product: Product) {
    const subscription$ = this.service.patch(`/${product.id}/approve`)
      .subscribe(
        (response: ApiResponse<Product>) => {
          if (response.status === 200) {
            product.status = response.data.status;
            this.gridData.data.splice(this.gridData.data.indexOf(response.data), 1);
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
          }
          subscription$.unsubscribe();
        },
        (err) => {
          subscription$.unsubscribe();
        }
      );
  }

  public disapprove(product: Product) {
    const subscription$ = this.service.patch(`/${product.id}/reject`)
      .subscribe(
        (response: ApiResponse<Product>) => {
          if (response.status === 200) {
            product.status = response.data.status;
            this.gridData.data.splice(this.gridData.data.indexOf(response.data), 1);
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
          }
          subscription$.unsubscribe();
        },
        (err) => {
          subscription$.unsubscribe();
          this.toastr.error(err.message || 'An unknown error occurred. Please try again.');
        }
      );
  }

  public loadProducts(page = 1) {
    let url = '';
    if (this.pageType && this.pageType === 'pending-approval') {
      url += '/status/WAITING_APPROVAL';
    }

    url += `?currentPage=${page}`;

    const subscription$ = this.service.getAll(url)
      .subscribe(
        (response: ApiResponse<any>) => {
          if (response.status === 200) {
            this.gridData = response.data;
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
          }
          subscription$.unsubscribe();
        },
        (err) => {
          subscription$.unsubscribe();
          this.toastr.error(err.message || 'An unknown error occurred. Please try again.');
        }
      );
    // this.gridView = this.gridData;
  }

  ngOnInit() {
  }

}
