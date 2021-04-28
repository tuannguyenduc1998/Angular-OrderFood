import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementUserRoutingModule } from './management-user-routing.module';
import { ManagementUserFormComponent } from './management-user-form/management-user-form.component';
import { ManagementUserListComponent } from './management-user-list/management-user-list.component';
import { ManagementUserComponent } from './management-user.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ManagementUserFormComponent, ManagementUserListComponent, ManagementUserComponent],
  imports: [
    CommonModule,
    ManagementUserRoutingModule,
    SharedModule
  ]
})
export class ManagementUserModule { }
