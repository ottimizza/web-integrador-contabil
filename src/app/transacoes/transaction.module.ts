import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeLineModule } from './timeline/timeline.module';
import { TransactionDetailModule } from './transaction-detail/transaction-detail.module';
import { TransactionListModule } from './transaction-list/transaction-list.module';

@NgModule({
    imports: [
        CommonModule,
        TimeLineModule,
        TransactionDetailModule,
        TransactionListModule
    ]
})
export class TransactionModule {}