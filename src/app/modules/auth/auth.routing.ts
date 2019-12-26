import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './page/callback/callback.component';

// import { ProjectResolver } from './project-resolver.service';
// import { HomeComponent } from './page/home.component';
// import { ProjectDetailsComponent } from './page/project-details/project-details.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'users',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: AuthCallbackComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
