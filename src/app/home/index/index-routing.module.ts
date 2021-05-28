import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailStoreComponent } from './detail-store/detail-store.component';
import { IndexComponent } from './index.component';
import { ViewStoreComponent } from './view-store/view-store.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        redirectTo: 'view-store',
        pathMatch: 'full'
      },
      {
        path: 'view-store',
        component: ViewStoreComponent
      },
      {
        path: 'detail-store/:id',
        component: DetailStoreComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
