import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowComponent } from './page/workflow.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null
    },
    component: WorkflowComponent
  },
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
