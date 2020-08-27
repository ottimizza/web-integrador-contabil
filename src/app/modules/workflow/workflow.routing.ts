import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'novo',
    data: {
      breadcrumb: null,
    },
    // component: HistoricListComponent
  },
  {
    path: ':id',
    data: {
      breadcrumb: null
    },
    // component:
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }
