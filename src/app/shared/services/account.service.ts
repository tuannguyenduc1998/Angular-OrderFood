import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  public changePassword(form): Observable<any>{
    return this.post<any>('/api/accounts/change-password', form, this.getHeaders());
  }

  public forgotPassword(email): Observable<any>{
    return this.post<any>('/api/accounts/forgot-password', { email });
  }

  public resetPassword(form): Observable<any>{
    return this.post<any>('/api/accounts/reset-password', form);
  }
}
