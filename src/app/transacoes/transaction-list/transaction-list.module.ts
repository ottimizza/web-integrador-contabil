import { NgModule } from '@angular/core';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionDetailModule } from '../transaction-detail/transaction-detail.module';
import { CommonModule } from '@angular/common';
import { FilterModule } from './filter/filter.module';

@NgModule({
    declarations: [TransactionListComponent],
    imports: [
        TransactionDetailModule,
        FilterModule,
        CommonModule
    ]
})
export class TransactionListModule { }
