import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { OrderDataFilter } from 'src/app/shared/models/order/order-data-filter.model';
import { OrderSummaryModel } from 'src/app/shared/models/order/order.model';
import { StoreSummaryModel } from 'src/app/shared/models/store/store.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-store-order',
  templateUrl: './store-order.component.html',
  styleUrls: ['./store-order.component.scss'],
})
export class StoreOrderComponent implements OnInit {
  orders: OrderSummaryModel[];
  userLogin: AuthenticationModel;
  filterModel: OrderDataFilter = new OrderDataFilter();
  store: StoreSummaryModel;
  searchTerm$ = new BehaviorSubject('');
  pageIndex = 1;
  pageSize = 5;
  total = 1;
  constructor(
    private orderService: OrderService,
    private storeService: StoreService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.userLogin = this.authenticationService.getAuthenticationModel();
    this.storeService.getStoreByUserId(this.userLogin.userId).subscribe( res => {
      this.store = res;
      this.searchTerm$.pipe(debounceTime(200)).subscribe((_) => {
        this.filterModel.keyWord = this.searchTerm$.value.trim();
        this.pageIndex = 1;
        this.filterListOrder();
      });
    });
  }

  filterListOrder(pageIndex?: number): void{
    this.filterModel.page = pageIndex;
    this.filterModel.storeId = this.store.id;
    const filter = { ...this.filterModel };
    this.orderService
      .listOrderPaging(filter)
      .subscribe((result) => {
        this.orders = result.items;
        this.total = result.total;
        this.pageIndex = this.filterModel.page ?  this.filterModel.page : 1;
      });
  }

  changPageSize(event: number): void {
    this.filterModel.pageSize = event;
    this.filterModel.page = 1;
    this.filterListOrder();
  }

  changePageIndex(event: number): void {
    this.filterListOrder(event);
  }

  renderIndex(index: number): number{
    return index + this.pageSize * (this.pageIndex - 1) + 1;
  }

  convertTime(date: Date): number{
    const timeSpandate = new Date(date).getTime();
    return timeSpandate;
  }
}
