import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AddOrderPopupComponent } from './popups/add-order-popup/add-order-popup.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AddOrderPopupComponent
  ],
  imports: [
    CommonModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    RouterModule,
    NzLayoutModule,
    NzModalModule,
    NzToolTipModule,
    NzInputModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  entryComponents: [
    AddOrderPopupComponent
  ]
})
export class ComponentModule { }
