import { NgModule } from '@angular/core';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionDetailModule } from '../transaction-detail/transaction-detail.module';
import { CommonModule } from '@angular/common';
import { InfoModule } from '@shared/components/info/info.module';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';
import { TransactionRoutingModule } from '../transaction.routing';
import { NgxGuidedTourModule } from '@gobsio/ngx-guided-tour';

@NgModule({
  declarations: [
    TransactionListComponent
  ],

  imports: [
    CommonModule,
    TransactionRoutingModule,
    TransactionDetailModule,
    InfoModule,
    NormalizedLayoutModule,
    NgxGuidedTourModule.forRoot(),
  ]
})
export class TransactionListModule { }
