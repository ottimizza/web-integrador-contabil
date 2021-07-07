import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionDetailModule } from './transaction-detail/transaction-detail.module';
import { TransactionListModule } from './transaction-list/transaction-list.module';
import { CallAccountantDialogComponent } from './dialogs/call-accountant-dialog/call-accountant-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        TransactionDetailModule,
        TransactionListModule
    ],
    declarations: [CallAccountantDialogComponent]
})
export class TransactionModule {}
