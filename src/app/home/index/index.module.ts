import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { ViewStoreComponent } from './view-store/view-store.component';
import { DetailStoreComponent } from './detail-store/detail-store.component';
import { IndexComponent } from './index.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IndexComponent,
    ViewStoreComponent,
    DetailStoreComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    SharedModule
  ]
})
export class IndexModule { }
