import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { DaoService } from './base/dao.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends DaoService {

  constructor(http: HttpClient) {
    //super(`${environment.orderUrl}/api/products`, http);
    super(`${environment.orderUrl}/api/orders`, http);
  }
}
