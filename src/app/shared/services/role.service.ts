import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  public GetRoleByUserId(userId): Observable<any[]> {
    return this.get<any[]>(`/api/roles/${userId}`);
  }
}
