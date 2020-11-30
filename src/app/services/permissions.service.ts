import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DaoService } from './base/dao.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService extends DaoService {

  constructor(http: HttpClient) {
    //super('http://localhost:8081/api/permissions', http);
    super(`${environment.authUrl}/api/permissions`, http);
  }
}
