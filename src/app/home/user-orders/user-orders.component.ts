import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Utils from 'src/app/shared/helpers/utils.helper';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { UserOrderDataFilter } from 'src/app/shared/models/order/order-data-filter.model';
import { UserOrderModel } from 'src/app/shared/models/order/order.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  userOrders: UserOrderModel[];
  userLogin: AuthenticationModel;
  filterModel: UserOrderDataFilter = new UserOrderDataFilter();
  searchTerm$ = new BehaviorSubject('');
  pageIndex = 1;
  pageSize = 5;
  total = 1;
  constructor(private orderService: OrderService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.userLogin = this.authenticationService.getAuthenticationModel();
    this.searchTerm$.pipe(debounceTime(200)).subscribe((_) => {
      this.filterModel.keyWord = this.searchTerm$.value.trim();
      this.pageIndex = 1;
      this.filterUserOrders();
    });
  }

  filterUserOrders(pageIndex?: number): void{
    this.filterModel.page = pageIndex;
    this.filterModel.userId = this.userLogin.userId;
    const filter = {...this.filterModel};
    this.orderService.listUserOrder(filter).subscribe((res) => {
      this.userOrders = res.items;
      this.total = res.total;
      this.pageIndex = this.filterModel.page ? this.filterModel.page : 1;
    });
  }

  changePageSize(event: number): void {
    this.filterModel.pageSize = event;
    this.filterModel.page = 1;
    this.filterUserOrders();
  }

  changePageIndex(index: number): void{
    this.filterUserOrders(index);
  }

  renderIndex(index: number): number {
    return Utils.renderIndex(index, this.pageSize, this.pageIndex);
  }

  convertTime(date: Date): number{
    const timeSpandate = new Date(date).getTime();
    return timeSpandate;
  }

  convertState(state: number): string{
    if (state === 0){
      return 'Đã hủy đơn';
    }
    if (state === 1){
      return 'Đang tạo đơn';
    }
    if (state === 2){
      return 'Đã chốt đơn';
    }
  }

}
