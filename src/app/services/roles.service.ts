import {environment} from './../../environments/environment';
import {Injectable} from '@angular/core';
import {DaoService} from './base/dao.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends DaoService {

  constructor(http: HttpClient) {
    super(`${environment.authUrl}/api/roles`, http);
  }
}
