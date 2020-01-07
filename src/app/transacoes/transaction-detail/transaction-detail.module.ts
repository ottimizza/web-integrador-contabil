import { NgModule } from '@angular/core';
import { TransactionDetailComponent } from './transaction-detail.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionInfoModule } from './transaction-info/transaction-info.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [TransactionDetailComponent],
    imports: [
        CommonModule,
        FormsModule,
        TransactionInfoModule,
        MatDialogModule
    ],
    exports: [TransactionDetailComponent]
})
export class TransactionDetailModule {}
