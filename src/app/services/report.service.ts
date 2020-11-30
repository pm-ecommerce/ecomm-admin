import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  d = new Date();
  dd = this.d.getDate();
  mm = this.d.getMonth() + 1;
  yyyy = this.d.getFullYear();
  apiUrl = `${environment.reportUrl}/api/report`;

  constructor(private httpClient: HttpClient) {
  }

  public getYearSeries(type: string) {
    const fromDate = this.mm + '/' + this.dd + '/' + (this.yyyy - 10);
    const toDate = this.mm + '/' + this.dd + '/' + this.yyyy;
    return this.httpClient.get(this.apiUrl + '/data/' + type + '?groupBy=year&fromDate=' + fromDate + '&toDate=' + toDate);
  }

  public getMonthSeries(type: string) {
    const fromDate = (this.mm - 1) + '/' + (this.dd - 1) + '/' + (this.yyyy - 1);
    const toDate = this.mm + '/' + this.dd + '/' + this.yyyy;
    return this.httpClient.get(this.apiUrl + '/data/' + type + '?groupBy=month&fromDate=' + fromDate + '&toDate=' + toDate);
  }

  public getWeekSeries(type: string) {
    const fromDate = (this.mm - 1) + '/' + (this.dd - 1) + '/' + this.yyyy;
    const toDate = this.mm + '/' + this.dd + '/' + this.yyyy;
    return this.httpClient.get(this.apiUrl + '/data/' + type + '?groupBy=week&fromDate=' + fromDate + '&toDate=' + toDate);
  }

  public getDaySeries(type: string) {
    const fromDate = this.mm + '/' + 1 + '/' + this.yyyy;
    const toDate = this.mm + '/' + this.dd + '/' + this.yyyy;
    return this.httpClient.get(this.apiUrl + '/data/' + type + '?groupBy=day&fromDate=' + fromDate + '&toDate=' + toDate);
  }
}
