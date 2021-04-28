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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
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
    NzDropDownModule
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
    NzDropDownModule
  ]
})
export class SharedModule { }
