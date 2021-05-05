import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'management-user',
        pathMatch: 'full',
      },
      {
        path: 'management-user',
        loadChildren: () => import('./management-user/management-user.module').then(mod => mod.ManagementUserModule)
      },
      {
        path: 'management-store',
        loadChildren: () => import('./management-store/management-store.module').then(mod => mod.ManagementStoreModule)
      },
      {
        path: 'management-product',
        loadChildren: () => import('./management-product/management-product.module').then(mod => mod.ManagementProductModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
