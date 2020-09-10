import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowComponent } from './page/workflow.component';
import { ScriptComponent } from './subpages/script/script.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null
    },
    component: WorkflowComponent
  },
  {
    path: 'new',
    data: {
      breadcrumb: null,
    },
    component: ScriptComponent
  },
  {
    path: ':id',
    data: {
      breadcrumb: null
    },
    component: ScriptComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }
