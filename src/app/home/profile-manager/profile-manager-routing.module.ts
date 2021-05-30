import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileManagerFormComponent } from './profile-manager-form/profile-manager-form.component';
import { ProfileManagerComponent } from './profile-manager.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileManagerComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component: ProfileManagerFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileManagerRoutingModule { }
