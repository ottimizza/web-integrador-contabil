import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

import { AuthGuard } from '@app/guard/auth.guard';
import { NoAuthGuard } from '@app/guard/no-auth.guard';
import { TransactionModule } from './transacoes/transaction.module';
import { TransactionListComponent } from './transacoes/transaction-list/transaction-list.component';
import { RuleCreatorComponent } from './rules/rule-creator/rule-creator.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/index',
    pathMatch: 'full'
  },
  {
    path: 'dashboard/:transactionId',
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
    path: 'regras',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard], // Should be replaced with actual auth guard
    children: [
      {
        path: 'nova',
        component: RuleCreatorComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'nova'
      }
    ]
  },
  {
    path: 'auth/callback',
    component: AuthLayoutComponent,
    loadChildren: () =>
    import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard/index',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
