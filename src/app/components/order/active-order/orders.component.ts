import { Order } from './../../../entities/report/order';
import { ReportResponse } from './../../../entities/report/report-response';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './../../../services/modal.service';
import { AuthService } from './../../../services/login.service';
import { OrderService } from './../../../services/order.service';
import { SortDescriptor, State, orderBy } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild(DataBindingDirective, { static: true })
  public dataBinding: DataBindingDirective;

  @ViewChild('details', { static: true })
  public details: TemplateRef<any>;

  public gridData: any;

  public vendorId: any;

  public sort: SortDescriptor[] = [
    {
      field: 'order_id',
      dir: 'desc'
    },
    {
      field: 'user_id',
      dir: 'asc'
    }
  ];
  public gridView: any;
  public state: State = {
    skip: 0
  };

  public order: any = {};
  public pageType = 'active';

  constructor(private service: OrderService, private authService: AuthService, private modal: ModalService, private route: ActivatedRoute) {
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

    this.vendorId = this.authService.getCurrentUser().id;

    this.route.params.subscribe(params => {
      this.pageType = params.type;
      this.loadOrders();
    });
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = {
      data: orderBy(this.gridView.data, this.sort),
      total: this.gridView.data.length
    };
  }

  public viewOrderItems(order = {}) {
    this.order = order;
    this.modal.open(this.details, 'lg');
  }

  getOrderTotal(order: any = {}) {
    const total = (order.items || []).reduce((sum, row) => sum + row.rate * row.quantity, 0);
    return total + (total * 0.07);
  }

  public close() {
    this.modal.close();
  }

  public loadOrders(page = 1) {
    const url = `?currentPage=${page}`;
    this.service.getAll('/' + this.pageType + url).subscribe((response: ReportResponse<any>) => {
      this.gridData = response.data;
    });
    this.gridView = this.gridData;
  }

  ngOnInit() {
  }

}
