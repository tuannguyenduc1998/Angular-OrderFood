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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordPopupComponent } from './popups/change-password-popup/change-password-popup.component';
import { ForgotPasswordPopupComponent } from './popups/forgot-password-popup/forgot-password-popup.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AddOrderPopupComponent,
    ChangePasswordPopupComponent,
    ForgotPasswordPopupComponent
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
    NzInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ChangePasswordPopupComponent
  ],
  entryComponents: [
    AddOrderPopupComponent,
    ChangePasswordPopupComponent
  ]
})
export class ComponentModule { }
