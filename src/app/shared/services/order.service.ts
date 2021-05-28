import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Utils from '../helpers/utils.helper';
import {
  OrderDataFilter,
  UserOrderDataFilter,
} from '../models/order/order-data-filter.model';
import { AddOrderDetailModel, OrderDetailModel, OrderDetailSummaryModel, OrderModel, OrderSummaryModel, UserOrderModel } from '../models/order/order.model';
import { PagePagination } from '../models/page-pagination.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  public listOrderPaging(
    params: OrderDataFilter
  ): Observable<PagePagination<OrderSummaryModel>> {
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

  public listUserOrder(
    params: UserOrderDataFilter
  ): Observable<PagePagination<UserOrderModel>> {
    const paramsFilter: UserOrderDataFilter = { ...params };

    if (!paramsFilter.page) {
      delete paramsFilter.page;
    }
    if (!paramsFilter.pageSize) {
      delete paramsFilter.pageSize;
    }
    if (!paramsFilter.keyWord) {
      delete paramsFilter.keyWord;
    }
    if (!paramsFilter.userId) {
      delete paramsFilter.userId;
    }
    if (!paramsFilter.productId) {
      delete paramsFilter.productId;
    }

    return this.get<PagePagination<UserOrderModel>>(
      '/api/orders/list-userorder-paging',
      Utils.createFilterParam({ ...paramsFilter }),
      this.getHeaders()
    ).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  public getOrderByUserId(userId: string): Observable<OrderModel[]>{
    return this.get<OrderModel[]>(`/api/orders/${userId}/user`);
  }

  public getOrdersById(id: string): Observable<OrderSummaryModel>{
    return this.get<OrderSummaryModel>(`/api/orders/${id}`);
  }

  public getOrderByStoreIdAndUserId(storeId, userId): Observable<OrderSummaryModel>{
    const params = {
      storeId,
      userId
    };
    return this.get<OrderSummaryModel>(`/api/orders/get-order-by-order-and-user`, params, this.getHeaders());
  }

  public getOrderDetailsByOrderId(orderId: string): Observable<OrderDetailSummaryModel[]>{
    return this.get<OrderDetailSummaryModel[]>(`/api/orders/${orderId}/orderdetail`);
  }

  public updateOrderDetail(orderForm): Observable<any>{
    return this.put<any>(`/api/orders/update`, orderForm, this.getHeaders());
  }

  public createOrder(orderForm): Observable<any>{
    return this.post<any>(`/api/orders/create`, orderForm, this.getHeaders());
  }

  public addOrderDetails(orderForm: OrderDetailModel[]): Observable<OrderDetailModel[]>{
    const orderDetail: AddOrderDetailModel = {
      orderDetails: orderForm
    };
    return this.post<OrderDetailModel[]>(`/api/orders/add`, orderDetail, this.getHeaders());
  }

  public deleteOrderDetail(orderIdAndProductId): Observable<any>{
    return this.delete<any>(`/api/orders/delete-orderdetail`, orderIdAndProductId, this.getHeaders());
  }

  public deleteAllOrderDetail(listOrderDetail): Observable<any[]>{
    const orderDetailsFrom = {
      orderDetails: listOrderDetail
    };
    return this.delete<any[]>(`/api/orders/delete-all-orderdetail`, orderDetailsFrom, this.getHeaders());
  }

  public changeStatus(changeForm): Observable<any>{
    return this.patch<any>(`/api/orders/change-status`, changeForm, this.getHeaders());
  }
}
