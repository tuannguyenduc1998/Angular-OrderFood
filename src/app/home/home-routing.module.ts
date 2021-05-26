import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
      },
      {
        path: 'index',
        component: IndexComponent
      },
      {
        path: 'store-manager',
        loadChildren: () => import('./store-manager/store-manager.module').then(mod => mod.StoreManagerModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule)
      },
      {
        path: 'user-orders',
        component: UserOrdersComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
