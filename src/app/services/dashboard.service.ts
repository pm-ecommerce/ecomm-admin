import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  d = new Date();
  dd = this.d.getDate();
  mm = this.d.getMonth() + 1;
  yyyy = this.d.getFullYear();
  saleApiUrl = `${environment.reportUrl}/api/report/data`;
  orderApiUrl = `${environment.reportUrl}/api/report/data/order`;

  constructor(private httpClient: HttpClient) {
  }

  public getYearSeries(vendorId?: number) {
    const fromDate = this.mm + '/' + this.dd + '/' + (this.yyyy - 10);
    const toDate = this.mm + '/' + this.dd + '/' + this.yyyy;
    return this.httpClient.get(this.orderApiUrl + '?groupBy=year&fromDate=' + fromDate + '&toDate=' + toDate);
  }

  public getMonthSeries(vendorId?: number) {
    const fromDate = (this.mm - 1) + '/' + (this.dd - 1) + '/' + (this.yyyy - 1);
    const toDate = this.mm + '/' + this.dd + '/' + this.yyyy;
    return this.httpClient.get(this.orderApiUrl + '?groupBy=month&fromDate=' + fromDate + '&toDate=' + toDate);
  }

  public getWeekSeries(vendorId?: number) {
    const fromDate = (this.mm - 1) + '/' + (this.dd - 1) + '/' + this.yyyy;
    const toDate = this.mm + '/' + this.dd + '/' + this.yyyy;
    return this.httpClient.get(this.orderApiUrl + '?groupBy=week&fromDate=' + fromDate + '&toDate=' + toDate);
  }

  public getThisMonthSeries(vendorId?: number) {
    const fromDate = this.mm + '/' + 1 + '/' + this.yyyy;
    const toDate = this.mm + '/' + 31 + '/' + this.yyyy;
    return this.httpClient.get(this.orderApiUrl + '?groupBy=day&fromDate=' + fromDate + '&toDate=' + toDate);
  }

  public getThisMonthSales(vendorId?: number) {
    const fromDate = this.mm + '/' + 1 + '/' + this.yyyy;
    const toDate = this.mm + '/' + 31 + '/' + this.yyyy;
    return this.httpClient.get(this.saleApiUrl + '?fromDate=' + fromDate + '&toDate=' + toDate);
  }

  public getSummary(vendorId?: number) {
    return this.httpClient.get(this.saleApiUrl);
  }

}
