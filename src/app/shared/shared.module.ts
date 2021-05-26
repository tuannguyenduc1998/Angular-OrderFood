import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from './component/component.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentModule,
    FormsModule,
    NzSelectModule,
    NzInputModule,
    NzToolTipModule,
    NzTableModule,
    NzSwitchModule,
    NzIconModule,
    NzButtonModule,
    NzMenuModule,
    NzDropDownModule,
    NzCardModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzNotificationModule,
    NzInputNumberModule,
    NzModalModule
  ],
  exports: [
    ReactiveFormsModule,
    ComponentModule,
    FormsModule,
    NzSelectModule,
    NzInputModule,
    NzToolTipModule,
    NzTableModule,
    NzSwitchModule,
    NzIconModule,
    NzButtonModule,
    NzMenuModule,
    NzDropDownModule,
    NzCardModule,
    RouterModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzNotificationModule,
    NzInputNumberModule,
    NzModalModule
  ],
  providers: [],
})
export class SharedModule { }
