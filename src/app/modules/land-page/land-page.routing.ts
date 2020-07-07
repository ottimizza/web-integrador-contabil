import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandPageComponent } from './page/land-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandPageRouting {}
