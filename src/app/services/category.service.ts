import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { DaoService } from './base/dao.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DaoService {

  constructor(http: HttpClient) {
    //super('http://localhost:8082/api/categories', http);
    super(`${environment.productUrl}/api/categories`, http);
  }
}
