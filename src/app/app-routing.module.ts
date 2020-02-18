import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

import { AuthGuard } from '@app/guard/auth.guard';
import { NoAuthGuard } from '@app/guard/no-auth.guard';
import { TransactionListComponent } from '@modules/transacoes/transaction-list/transaction-list.component';
import { RuleListComponent } from '@modules/rule-list/rule-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lancamentos/',
    pathMatch: 'full'
  },
  {
    path: 'lancamentos/',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard], // Should be replaced with actual auth guard
    children: [
      {
        path: '',
        component: TransactionListComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'auth/callback',
    component: AuthLayoutComponent,
    loadChildren: () =>
    import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
  { //
    path: 'regras', //
    component: ContentLayoutComponent, //
    canActivate: [AuthGuard], // Should be replaced with actual auth guard //
    children: [ //
      { //
        path: '', //
        component: RuleListComponent, //
        pathMatch: 'full', //
        canActivate: [AuthGuard] //
      } //
    ] //
  }, //
  {
    path: '**',
    redirectTo: 'lancamentos/',
    pathMatch: 'full'
  },
  {
    path: 'lancamentos/:ReportId',
    redirectTo: 'lancamentos/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
