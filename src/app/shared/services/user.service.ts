import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Utils from '../helpers/utils.helper';
import { PagePagination } from '../models/page-pagination.model';
import { Register } from '../models/user/register.model';
import { UserDataFilter } from '../models/user/user-data-filter.model';
import { UserData } from '../models/user/user-data.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
   }
  public registerUser(formSignUp: Register): Observable<Register>{
    const requestModel = {
      userName: formSignUp.userName,
      password: formSignUp.password,
      verifyPassword: formSignUp.verifyPassword,
      email: formSignUp.email,
      fullName: formSignUp.fullName,
      gender: formSignUp.gender ? formSignUp.gender : 0,
      avatar: formSignUp.avatar ? formSignUp.avatar : '',
      dateOfBirth: formSignUp.dateOfBirth ? formSignUp.dateOfBirth : '2021-04-24',
      phoneNumber: formSignUp.phoneNumber ? formSignUp.phoneNumber : '',
      address: formSignUp.address ? formSignUp.address : ''
    };
    return this.post<Register>('/api/users/register-user', requestModel);
  }

  public listUser(
    params: UserDataFilter
  ): Observable<PagePagination<UserData>>{
    const paramsFilter: UserDataFilter = { ...params };
    if (!paramsFilter.page) {
      delete paramsFilter.page;
    }
    if (!paramsFilter.pageSize) {
      delete paramsFilter.pageSize;
    }
    if (!paramsFilter.keyWord) {
      delete paramsFilter.keyWord;
    }
    const httpOptions = this.getHeaders();
    return this.get(
      `/api/users/list-user-paging`,
      Utils.createFilterParam({ ...paramsFilter }), httpOptions
    ).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  public getUserById(userId): Observable<UserData>{
    return this.get<UserData>(`/api/users/${userId}`);
  }
}
