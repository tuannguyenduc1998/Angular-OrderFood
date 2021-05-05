import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementStoreRoutingModule } from './management-store-routing.module';
import { ManagementStoreListComponent } from './management-store-list/management-store-list.component';
import { ManagementStoreComponent } from './management-store.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ManagementStoreComponent, ManagementStoreListComponent],
  imports: [
    CommonModule,
    ManagementStoreRoutingModule,
    SharedModule
  ]
})
export class ManagementStoreModule { }
