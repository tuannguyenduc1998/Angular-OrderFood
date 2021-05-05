import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseData } from '../models/response.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(public http: HttpClient) { }

  get apiEndpoint(): string {
    return environment.API_ENDPOINT_LOCAL;
  }

  private loggedInStatus = JSON.parse(localStorage.getItem('OrderFoodApi'));
  getHeaders(): any{
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': type , Authorization:
    //   `Bearer ${this.loggedInStatus.accessToken}`})
    // };
    const httpOptions = new HttpHeaders().set( 'Authorization', `Bearer ${this.loggedInStatus.accessToken}`);
    return httpOptions;
  }

  public get<T>(url: string, params?: any, headers?: any): Observable<any> {
    return this.http
      .get(this.apiEndpoint + url, { params, headers })
      .pipe(map((result: ResponseData<T>) => result.object as T));
  }

  public post<T>(url: string, data?: any, headers?: any): Observable<any> {
    return this.http
      .post(this.apiEndpoint + url, data, { headers })
      .pipe(map((result: ResponseData<T>) => result.object as T));
  }

  public put<T>(url: string, data: any, headers?: any): Observable<T> {
    return this.http
      .put(this.apiEndpoint + url, data, { headers })
      .pipe(map(result => result as T));
  }

  public patch<T>(url: string, data: any, headers?: any): Observable<T> {
    return this.http
      .patch(this.apiEndpoint + url, data, { headers })
      .pipe(map(result => result as T));
  }

  public delete<T>(url: string, data: any, headers?: any): Observable<T> {
    return this.http.request<T>('delete', this.apiEndpoint + url, {
      headers,
      body: data
    }).pipe(map(result => result as T));
  }
}
