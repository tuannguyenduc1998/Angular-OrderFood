import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementUserListComponent } from './management-user-list/management-user-list.component';
import { ManagementUserComponent } from './management-user.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementUserComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ManagementUserListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementUserRoutingModule { }
