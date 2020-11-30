import { Component, OnInit } from '@angular/core';
import {GroupByYear} from '../../entities/report/group-by-year';
import {GroupByMonth} from '../../entities/report/group-by-month';
import {GroupByWeek} from '../../entities/report/group-by-week';
import {GroupByDay} from '../../entities/report/group-by-day';
import {DashboardService} from '../../services/dashboard.service';
import {ReportResponse} from '../../entities/report/report-response';
import {Order} from '../../entities/report/order';
import {Summary} from '../../entities/report/summary';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private apiService: DashboardService) {
    this.apiService.getYearSeries().subscribe((response: ReportResponse<any>) => {
      this.yGroup = response.data.responseData.list;
      for (const g of this.yGroup) {
        this.yCountValues.push(g.count);
        this.ySumValues.push(g.sum);
        this.yLabels.push(g.year);
      }
    });
    this.apiService.getMonthSeries().subscribe((response: ReportResponse<any>) => {
      this.mGroup = response.data.responseData.list;
      for (const g of this.mGroup) {
        this.mCountValues.push(g.count);
        this.mSumValues.push(g.sum);
        this.mLabels.push(g.month);
      }
    });
    this.apiService.getWeekSeries().subscribe((response: ReportResponse<any>) => {
      this.wGroup = response.data.responseData.list;
      for (const g of this.wGroup) {
        this.wCountValues.push(g.count);
        this.wSumValues.push(g.sum);
        this.wLabels.push(g.week);
      }
    });
    this.apiService.getThisMonthSeries().subscribe((response: ReportResponse<any>) => {
      this.dGroup = response.data.responseData.list;
      for (const g of this.dGroup) {
        this.dCountValues.push(g.count);
        this.dSumValues.push(g.sum);
        this.dLabels.push(g.day);
        this.dTotalCount += g.count;
        this.dTotalSum += g.sum;
      }
    });
    this.apiService.getThisMonthSales().subscribe((response: ReportResponse<any>) => {
      console.log(response);
      this.mSales = response.data.responseData.list;
      this.mOrderTotal = this.mSales.length;
      for (const o of this.mSales) {
        if (o.status === 'RECEIVED' || o.status === 'IN_PROGRESS' || o.status === 'SHIPPED') {
          this.mNewOrderTotal += 1;
          if (o.status === 'IN_PROGRESS') {
            this.mInProgressOrderTotal += 1;
          }
        } else if (o.status === 'DELIVERED') {
          this.mCompletedOrderTotal += 1;
        } else {
        }
      }
    });

    this.apiService.getSummary(null).subscribe((response: ReportResponse<any>) => {
      console.log(response);
      this.summary = response.data.responseData.total;
    });
  }
  // summary
  public summary: Summary;

  // sales
  private mSales: Order[] = [];
  public mOrderTotal = 0;
  public mNewOrderTotal = 0;
  public mInProgressOrderTotal = 0;
  public mCompletedOrderTotal = 0;
  // year series
  private yGroup: GroupByYear [] = [];
  public yCountValues: number[] = [];
  public ySumValues: number[] = [];
  public yLabels: string[] = [];
  // month series
  private mGroup: GroupByMonth [] = [];
  public mCountValues: number[] = [];
  public mSumValues: number[] = [];
  public mLabels: string[] = [];
  public mTotalCount = 0;
  public mTotalSum = 0;
  // week series
  private wGroup: GroupByWeek [] = [];
  public wCountValues: number[] = [];
  public wSumValues: number[] = [];
  public wLabels: string[] = [];
  public wTotalCount = 0;
  public wTotalSum = 0;
  // day series
  private dGroup: GroupByDay [] = [];
  public dCountValues: number[] = [];
  public dSumValues: number[] = [];
  public dLabels: string[] = [];
  public dTotalCount = 0;
  public dTotalSum = 0;
  ngOnInit() {
  }
}
