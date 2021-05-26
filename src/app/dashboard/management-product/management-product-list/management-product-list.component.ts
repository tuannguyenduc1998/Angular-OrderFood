import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { ProductDataFilter } from 'src/app/shared/models/product/product-data-filter.model';
import { ProductModel, ProductSummaryModel } from 'src/app/shared/models/product/product.model';
import { StoreModel, StoreSummaryModel } from 'src/app/shared/models/store/store.model';
import { UserDataFilter } from 'src/app/shared/models/user/user-data-filter.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-management-product-list',
  templateUrl: './management-product-list.component.html',
  styleUrls: ['./management-product-list.component.scss'],
})
export class ManagementProductListComponent implements OnInit {
  filterModel: ProductDataFilter = new ProductDataFilter();
  userLogin: AuthenticationModel;
  products: ProductSummaryModel[];
  store: StoreSummaryModel;
  searchTerm$ = new BehaviorSubject('');
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  url = environment.API_ENDPOINT_LOCAL;
  constructor(
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.userLogin = this.authenticationService.getAuthenticationModel();
    this.storeService.getStoreByUserId(this.userLogin.userId).subscribe( res => {
      this.store = res;
    });
    this.searchTerm$.pipe(debounceTime(200)).subscribe((_) => {
      this.filterModel.keyWord = this.searchTerm$.value.trim();
      this.pageIndex = 1;
      this.filterProductList();
    });
  }

  filterProductList(pageIndex?: number): void {
    this.filterModel.page = pageIndex;
    this.filterModel.storeId = this.store.id;
    const filter = { ...this.filterModel };
    this.productService
      .listProductPaging(filter)
      .subscribe((result) => {
        this.products = result.items;
        this.total = result.total;
        this.pageIndex = pageIndex;
      });
  }

  changPageSize(event: number): void {
    this.filterModel.pageSize = event;
    this.filterModel.page = 1;
    this.filterProductList();
  }

  changePageIndex(event: number): void {
    this.filterProductList(event);
  }
}
