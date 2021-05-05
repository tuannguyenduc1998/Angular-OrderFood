import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Utils from '../helpers/utils.helper';
import { OrderDataFilter } from '../models/order/order-data-filter.model';
import { OrderSummaryModel } from '../models/order/order.model';
import { PagePagination } from '../models/page-pagination.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
   }

  public listOrderPaging(
    params: OrderDataFilter
  ): Observable<PagePagination<OrderSummaryModel>>{
    const paramsFilter: OrderDataFilter = { ...params };
    if (!paramsFilter.page) {
      delete paramsFilter.page;
    }
    if (!paramsFilter.pageSize) {
      delete paramsFilter.pageSize;
    }
    if (!paramsFilter.keyWord) {
      delete paramsFilter.keyWord;
    }
    if (!paramsFilter.storeId) {
      delete paramsFilter.storeId;
    }
    const httpOptions = this.getHeaders();
    return this.get(
      `/api/orders/list-order-summary-paging`,
      Utils.createFilterParam({ ...paramsFilter }),
      httpOptions
    ).pipe(
      map((result: any) => {
        return result;
      })
    );
  }
}
