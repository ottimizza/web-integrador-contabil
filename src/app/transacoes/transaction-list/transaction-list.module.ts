import { NgModule } from '@angular/core';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionDetailModule } from '../transaction-detail/transaction-detail.module';
import { TimeLineModule } from '../timeline/timeline.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [TransactionListComponent],
    imports: [
        TransactionDetailModule,
        TimeLineModule,
        CommonModule
    ]
})
export class TransactionListModule { }
