import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Utils from '../helpers/utils.helper';
import { PagePagination } from '../models/page-pagination.model';
import { ProductDataFilter } from '../models/product/product-data-filter.model';
import { ProductModel, ProductSummaryModel } from '../models/product/product.model';
import { UserDataFilter } from '../models/user/user-data-filter.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  constructor(private httpclient: HttpClient) {
    super(httpclient);
  }

  public listProductPaging(
    params: ProductDataFilter
  ): Observable<PagePagination<ProductModel>> {
    const paramsFilter: ProductDataFilter = { ...params };
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
      `/api/products/list-product-paging`,
      Utils.createFilterParam({ ...paramsFilter }),
      httpOptions
    ).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  public getProductById(productId): Observable<ProductSummaryModel>{
    return this.get<ProductSummaryModel>(`/api/products/${productId}`);
  }

  public createOrUpdate(productForm): Observable<any>{
    if (productForm.productId)
    {
      return this.put<any>(`/api/products/update`, productForm, this.getHeaders());
    }
    else{
      return this.post<any>(`/api/products/create`, productForm, this.getHeaders());
    }
  }

  public getAllCategory(): Observable<any>{
    return this.get<any>(`/api/categories/get-all-category`);
  }
}
