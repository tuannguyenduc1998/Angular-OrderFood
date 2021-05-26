import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersCreateComponent } from './orders-create/orders-create.component';
import { OrdersFormComponent } from './orders-form/orders-form.component';
import { OrdersViewComponent } from './orders-view/orders-view.component';
import { OrdersComponent } from './orders.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OrdersComponent,
    OrdersCreateComponent,
    OrdersFormComponent,
    OrdersViewComponent,
    OrdersDetailComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
