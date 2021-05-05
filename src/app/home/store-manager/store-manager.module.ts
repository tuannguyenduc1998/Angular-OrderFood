import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreManagerRoutingModule } from './store-manager-routing.module';
import { StoreComponent } from './store/store.component';
import { ProductComponent } from './product/product.component';
import { StoreOrderComponent } from './store-order/store-order.component';
import { StoreManagerComponent } from './store-manager.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [StoreManagerComponent, StoreComponent, StoreOrderComponent],
  imports: [
    CommonModule,
    StoreManagerRoutingModule,
    SharedModule
  ]
})
export class StoreManagerModule { }
