import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { StoreManagerComponent } from './store-manager.component';
import { StoreOrderComponent } from './store-order/store-order.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  {
    path: '',
    component: StoreManagerComponent,
    children: [
      {
        path: '',
        redirectTo: 'store',
        pathMatch: 'full'
      },
      {
        path: 'store',
        component: StoreComponent
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then( mod => mod.ProductModule)
      },
      {
        path: 'store-order',
        component: StoreOrderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreManagerRoutingModule { }
