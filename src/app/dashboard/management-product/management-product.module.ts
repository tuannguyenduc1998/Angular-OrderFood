import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementProductRoutingModule } from './management-product-routing.module';
import { ManagementProductListComponent } from './management-product-list/management-product-list.component';
import { ManagementProductComponent } from './management-product.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ManagementProductListComponent,
    ManagementProductComponent
  ],
  imports: [
    CommonModule,
    ManagementProductRoutingModule,
    SharedModule
  ]
})
export class ManagementProductModule { }
