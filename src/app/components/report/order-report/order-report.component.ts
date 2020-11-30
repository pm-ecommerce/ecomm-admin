import { Component, OnInit } from '@angular/core';
import {ReportResponse} from '../../../entities/report/report-response';
import {GroupByYear} from '../../../entities/report/group-by-year';
import {GroupByMonth} from '../../../entities/report/group-by-month';
import {GroupByWeek} from '../../../entities/report/group-by-week';
import {GroupByDay} from '../../../entities/report/group-by-day';
import {ReportService} from '../../../services/report.service';


@Component({
  selector: 'app-order-report',
  templateUrl: '../report.component.html',
  styleUrls: ['../report.component.scss']
})
export class OrderReportComponent implements OnInit {

  constructor(private apiService: ReportService) {
    this.yGroup = [];
    this.mGroup = [];
    this.wGroup = [];
    this.dGroup = [];
    this.apiService.getYearSeries(this.type).subscribe((response: ReportResponse<any>) => {
      this.yGroup = response.data.responseData.list;
      for (const g of this.yGroup) {
        this.yCountValues.push(g.count);
        this.ySumValues.push(g.sum);
        this.yLabels.push(g.year);
      }
    });
    this.apiService.getMonthSeries(this.type).subscribe((response: ReportResponse<any>) => {
      this.mGroup = response.data.responseData.list;
      for (const g of this.mGroup) {
        this.mCountValues.push(g.count);
        this.mSumValues.push(g.sum);
        this.mLabels.push(g.month);
      }
    });
    this.apiService.getWeekSeries(this.type).subscribe((response: ReportResponse<any>) => {
      this.wGroup = response.data.responseData.list;
      for (const g of this.wGroup) {
        this.wCountValues.push(g.count);
        this.wSumValues.push(g.sum);
        this.wLabels.push(g.week);
      }
    });
    this.apiService.getDaySeries(this.type).subscribe((response: ReportResponse<any>) => {
      this.dGroup = response.data.responseData.list;
      for (const g of this.dGroup) {
        this.dCountValues.push(g.count);
        this.dSumValues.push(g.sum);
        this.dLabels.push(g.day);
      }
    });
  }
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
  // week series
  private wGroup: GroupByWeek [] = [];
  public wCountValues: number[] = [];
  public wSumValues: number[] = [];
  public wLabels: string[] = [];
  // day series
  private dGroup: GroupByDay [] = [];
  public dCountValues: number[] = [];
  public dSumValues: number[] = [];
  public dLabels: string[] = [];
  type = 'order';
  ngOnInit() {
  }
  public download() {
    window.open('http://localhost:8086/api/report/pdf/full-report', '_new');
  }
}
