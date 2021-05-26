import { Component, OnInit } from '@angular/core';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { OrderModel } from 'src/app/shared/models/order/order.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss']
})
export class OrdersViewComponent implements OnInit {

  orders: OrderModel[];
  user: AuthenticationModel;
  url = environment.API_ENDPOINT_LOCAL;
  constructor(private orderService: OrderService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getAuthenticationModel();
    this.orderService.getOrderByUserId(this.user.userId).subscribe((res) => {
      this.orders = res;
    });
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
