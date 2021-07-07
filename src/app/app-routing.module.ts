import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

import { AuthGuard } from '@app/guard/auth.guard';
import { NoAuthGuard } from '@app/guard/no-auth.guard';
import { AdminGuard } from '@app/guard/admin.guard';
import { InsertEntryDescriptionComponent } from '@modules/insert-entry-description/pages/insert-entry-description/insert-entry-description.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [NoAuthGuard],
    loadChildren: () =>
    import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'landpage',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('@modules/land-page/land-page.module').then(m => m.LandPageModule)
  },
  {
    path: 'description/:uid',
    canActivate: [NoAuthGuard],
    pathMatch: 'full',
    data: {
      breadcrumb: 'Dúvida'
    },
    component: InsertEntryDescriptionComponent,
    loadChildren: () => import('@modules/insert-entry-description/insert-entry-description.module').then(m => m.InsertEntryDescriptionModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: ContentLayoutComponent,
    children: [

      {
        path: 'historics',
        data: {
          breadcrumb: 'Históricos'
        },
        loadChildren: () => import('@modules/historic/historic-list.module').then(m => m.HistoricListModule)
      },
      {
        path: 'workflow',
        // canActivate: [AdminGuard],
        data: {
          breadcrumb: 'Empresas'
        },
        loadChildren: () => import('@modules/workflow/workflow.module').then(m => m.WorkflowModule)
      },
      {
        path: 'integrations',
        canActivate: [AdminGuard],
        data: {
          breadcrumb: 'Padrões de Integração'
        },
        loadChildren: () => import('@modules/integrations/integrations.module').then(m => m.IntegrationsModule)
      },
      {
        path: 'rules',
        data: {
          breadcrumb: 'Regras'
        },
        loadChildren: () => import('@modules/rule-list/rule-list.module').then(m => m.RuleListModule)
      },
      {
        path: 'entrys',
        data: {
          breadcrumb: 'Última Digitação'
        },
        loadChildren: () => import('@modules/transacoes/transaction.module').then(m => m.TransactionModule)
      },
      {
        path: '',
        redirectTo: 'entrys',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'entrys',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'entrys',
    redirectTo: 'dashboard/entrys',
    pathMatch: 'full'
  },
  {
    path: 'rules',
    redirectTo: 'dashboard/rules',
    pathMatch: 'full'
  },
  {
    path: 'historics',
    redirectTo: 'dashboard/historics',
    pathMatch: 'full'
  },
  {
    path: 'workflow',
    redirectTo: 'dashboard/workflow',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
