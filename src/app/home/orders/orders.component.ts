import { Component, OnInit } from '@angular/core';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { OrderModel } from 'src/app/shared/models/order/order.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
