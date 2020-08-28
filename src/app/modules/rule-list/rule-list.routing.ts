import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RuleListComponent } from './rule-list.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
    },
    component: RuleListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleListRoutingModule { }
