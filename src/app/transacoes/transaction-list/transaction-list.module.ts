import { NgModule } from '@angular/core';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionDetailModule } from '../transaction-detail/transaction-detail.module';
import { CommonModule } from '@angular/common';
import { FilterModule } from './filter/filter.module';
import { InfoModule } from '@shared/components/info/info.module';

@NgModule({
    declarations: [TransactionListComponent],
    imports: [
        TransactionDetailModule,
        FilterModule,
        CommonModule,
        InfoModule
    ]
})
export class TransactionListModule { }
