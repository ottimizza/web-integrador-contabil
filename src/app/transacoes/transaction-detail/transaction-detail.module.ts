import { NgModule } from '@angular/core';
import { TransactionDetailComponent } from './transaction-detail.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionInfoModule } from './transaction-info/transaction-info.module';
import { MatDialogModule } from '@angular/material/dialog';
import { RuleCreatorModule } from './rule-creator/rule-creator.module';
import { RuleCreatorComponent } from './rule-creator/rule-creator.component';

@NgModule({
    declarations: [TransactionDetailComponent],
    imports: [
        CommonModule,
        FormsModule,
        RuleCreatorModule,
        TransactionInfoModule,
        MatDialogModule
    ],
    entryComponents: [RuleCreatorComponent],
    exports: [TransactionDetailComponent]
})
export class TransactionDetailModule {}
