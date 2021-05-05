import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementStoreListComponent } from './management-store-list/management-store-list.component';
import { ManagementStoreComponent } from './management-store.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementStoreComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ManagementStoreListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementStoreRoutingModule { }
