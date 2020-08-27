import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

import { AuthGuard } from '@app/guard/auth.guard';
import { NoAuthGuard } from '@app/guard/no-auth.guard';
import { TransactionListComponent } from '@modules/transacoes/transaction-list/transaction-list.component';
import { RuleListComponent } from '@modules/rule-list/rule-list.component';
import { LandPageComponent } from '@modules/land-page/page/land-page.component';

const routes: Routes = [
  // {
  //   path: 'auth',
  //   component: AuthLayoutComponent,
  //   loadChildren: () =>
  //   import('@modules/auth/auth.module').then(m => m.AuthModule)
  // },
  // {
  //   path: 'landpage',
  //   data: {
  //     breadcrumb: null
  //   },
  //   canActivate: [NoAuthGuard],
  //   loadChildren: () => import('@modules/land-page/land-page.module').then(m => m.LandPageModule)
  // },
  // {
  //   path: 'dashboard',
  //   canActivate: [AuthGuard],
  //   data: {
  //     breadcrumb: null
  //   },
  //   component: ContentLayoutComponent,
  //   children: [

  //     {
  //       path: 'historic',
  //       data: {
  //         breadcrumb: 'Históricos'
  //       },
  //       loadChildren: () => import('@modules/historic/historic-list.module').then(m => m.HistoricListModule)
  //     },
  //     {
  //       path: 'workflow',
  //       data: {
  //         breadcrumb: 'Fluxo de Planilhas'
  //       },
  //       loadChildren: () => import('@modules/workflow/workflow.module').then(m => m.WorkflowModule)
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   redirectTo: 'dashboard/',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '**',
  //   redirectTo: 'dashboard/',
  //   pathMatch: 'full'
  // }



  {
    path: '',
    redirectTo: 'lancamentos/',
    pathMatch: 'full'
  },
  {
    path: 'lancamentos/',
    data: {
      breadcrumb: 'Última Digitação'
    },
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
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
    import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'historicos',
    data: {
      breadcrumb: 'Históricos'
    },
    canActivate: [AuthGuard],
    component: ContentLayoutComponent,
    loadChildren: () => import('@modules/historic/historic-list.module').then(m => m.HistoricListModule)
  },
  {
    path: 'fluxo',
    data: {
      breadcrumb: 'Fluxo de Planilhas',
    },
    canActivate: [AuthGuard],
    component: ContentLayoutComponent,
    loadChildren: () => import('@modules/workflow/workflow.module').then(m => m.WorkflowModule)
  },
  {
    path: 'regras',
    data: {
      breadcrumb: 'Regras'
    },
    component: ContentLayoutComponent,
    canActivate: [AuthGuard], // Should be replaced with actual auth guard
    children: [
      {
        path: '',
        component: RuleListComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'lancamentos/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
