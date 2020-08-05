import { NgModule } from '@angular/core';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionDetailModule } from '../transaction-detail/transaction-detail.module';
import { CommonModule } from '@angular/common';
import { FilterModule } from './filter/filter.module';
import { InfoModule } from '@shared/components/info/info.module';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';

@NgModule({
    declarations: [TransactionListComponent],
    imports: [
        TransactionDetailModule,
        FilterModule,
        CommonModule,
        InfoModule,
        NormalizedLayoutModule
    ]
})
export class TransactionListModule { }
