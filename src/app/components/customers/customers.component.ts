import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {orderBy, SortDescriptor, State} from '@progress/kendo-data-query';
import {ApiResponse} from './../../shared/api-response';
import {Component, OnInit} from '@angular/core';
import {CustomersService} from 'src/app/services/customers.service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    customers: any;

    constructor(private service: CustomersService, private route: ActivatedRoute, private toastr: ToastrService) {
        this.customers = {
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
            this.loadCustomers();
        });
    }

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

    ngOnInit() {

    }

    public loadCustomers(page = 1) {
        let url = '';
        if (this.pageType && this.pageType === 'guests') {
            url += '/guests';
        }

        url += `?currentPage=${page}`;
        const subscribe$ = this.service.getAll(url)
            .subscribe(
                (response: ApiResponse<any>) => {
                    this.customers = response.data;
                    subscribe$.unsubscribe();
                    // this.toastr.alert(response.message || 'An un expected error has occured.');
                },
                (error: ApiResponse<any>) => {

                    this.toastr.error(error.message || 'An un expected error has occured.');
                    subscribe$.unsubscribe();
                }
            );
    }

    public delete(id) {
        const subs$ = this.service.delete(id)
            .subscribe(
                (response: ApiResponse<any>) => {
                    //alert(response.message);
                    this.toastr.error(response.message || 'Successfully deleted.');
                    subs$.unsubscribe();
                },
                (error: ApiResponse<any>) => {
                    this.toastr.error(error.message || 'An un expected error has occured.');
                    subs$.unsubscribe();
                }
            );
    }

}
