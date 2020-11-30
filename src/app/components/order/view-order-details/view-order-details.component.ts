import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.scss']
})
export class ViewOrderDetailsComponent implements OnInit {
  @Input()
  public order: any;

  constructor() {
  }

  getOrderTotal() {
    const total = (this.order.items || []).reduce((sum, row) => sum + row.rate * row.quantity, 0);
    return total + (total * 0.07);
  }

  ngOnInit() {
  }

}
