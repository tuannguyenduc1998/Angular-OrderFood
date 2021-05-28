import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Utils from '../helpers/utils.helper';
import { PagePagination } from '../models/page-pagination.model';
import { StoreModel, StoreSummaryModel } from '../models/store/store.model';
import { UserDataFilter } from '../models/user/user-data-filter.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  public getAllStore(): Observable<StoreSummaryModel[]> {
    return this.get<StoreSummaryModel[]>('/api/stores/get-all-store').pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  public listStorePaging(
    params: UserDataFilter
  ): Observable<PagePagination<StoreSummaryModel>> {
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
      `/api/stores/list-store-paging`,
      Utils.createFilterParam({ ...paramsFilter }),
      httpOptions
    ).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  public getStoreByUserId(userId: string): Observable<StoreSummaryModel> {
    return this.get<StoreSummaryModel>(`/api/stores/${userId}/user`).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  public createOrUpdate(storeForm): Observable<any>{
    if (storeForm.storeId)
    {
      return this.put<any>(`/api/stores/update`, storeForm, this.getHeaders());
    }
    else{
      return this.post<any>(`/api/stores/create`, storeForm, this.getHeaders());
    }
  }

  public getStoreByStoreId(storeId: string): Observable<StoreSummaryModel> {
    return this.get<StoreSummaryModel>(`/api/stores/${storeId}`);
  }
}
