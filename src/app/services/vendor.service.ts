import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DaoService } from './base/dao.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorService extends DaoService {

  constructor(http: HttpClient) {
    //super('http://localhost:8081/api/vendors', http);
    super(`${environment.authUrl}/api/vendors`, http);
  }
}
