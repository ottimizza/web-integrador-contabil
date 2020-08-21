import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoricListComponent } from './page/historic-list.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
    },
    component: HistoricListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricListRoutingModule { }
