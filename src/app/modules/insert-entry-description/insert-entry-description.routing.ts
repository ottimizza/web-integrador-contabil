import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertEntryDescriptionComponent } from './pages/insert-entry-description/insert-entry-description.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
    },
    component: InsertEntryDescriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsertEntryDescriptionRoutingModule { }
