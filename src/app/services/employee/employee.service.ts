import { environment } from './../../../environments/environment';
import { DaoService } from '../base/dao.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends DaoService {

  constructor(http: HttpClient) {
    super(`${environment.authUrl}/api/employees`, http);
    //super('http://localhost:8080/pm-accounts/api/employees', http);
  }
}
