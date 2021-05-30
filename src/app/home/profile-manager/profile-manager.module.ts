import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileManagerRoutingModule } from './profile-manager-routing.module';
import { ProfileManagerFormComponent } from './profile-manager-form/profile-manager-form.component';
import { ProfileManagerComponent } from './profile-manager.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfileManagerFormComponent,
    ProfileManagerComponent
  ],
  imports: [
    CommonModule,
    ProfileManagerRoutingModule,
    SharedModule
  ]
})
export class ProfileManagerModule { }
