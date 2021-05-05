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
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  speed: 800,
  slidesPerView: 4,
  slidesPerColumn: 1,
  slidesPerGroup: 2,
  spaceBetween: 20,
  grabCursor: false,
    autoplay: {
      delay: 3000
    },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
};
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
    SwiperModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzNotificationModule
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
    SwiperModule,
    RouterModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzNotificationModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class SharedModule { }
