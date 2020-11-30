import {BadInput} from '../../shared/bad-input';

import {NotFoundError} from 'src/app/shared/not-found-error';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {throwError} from 'rxjs';
import {AppError} from 'src/app/shared/app-error';

export class DaoService {

  private httpOptions;

  constructor(private url: string, private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token')
      })
    };
  }

  getAll(path = '') {
    return this.http.get(this.url + path)
      .pipe(
        catchError(this.handleError)
      );
  }

  get(id) {
    return this.http.get(this.url + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(resource) {
    return this.http.post(this.url, resource)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(path = '', data) {
    return this.http.put(this.url + path, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  patch(url = '', data = {}) {
    return this.http.patch(this.url + url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(url = '', credentials = {}) {
    return this.http.post(this.url + url, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: Response) {
    switch (error.status) {
      case 400:
        return throwError(new BadInput(error));
      case 404:
        return throwError(new NotFoundError(error));
      default:
        return throwError(new AppError(error));
    }
  }
}
