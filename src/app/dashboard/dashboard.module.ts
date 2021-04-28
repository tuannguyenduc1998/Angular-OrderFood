import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ManagementUserComponent } from './management-user/management-user.component';
import { ManagementUserFormComponent } from './management-user/management-user-form/management-user-form.component';
import { ManagementUserListComponent } from './management-user/management-user-list/management-user-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
