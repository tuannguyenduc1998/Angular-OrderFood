import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementProductListComponent } from './management-product-list/management-product-list.component';
import { ManagementProductComponent } from './management-product.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementProductComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ManagementProductListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementProductRoutingModule { }
