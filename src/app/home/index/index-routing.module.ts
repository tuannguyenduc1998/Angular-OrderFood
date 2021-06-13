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
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: ViewStoreComponent,
        data: {
          title: 'Home',
        },
      },
      {
        path: 'detail-store/:id',
        component: DetailStoreComponent,
        data: {
          title: 'Store-detail',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
