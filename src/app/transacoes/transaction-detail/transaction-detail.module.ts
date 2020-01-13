import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TransactionDetailComponent } from './transaction-detail.component';
import { TransactionInfoModule } from './transaction-info/transaction-info.module';
import { RuleCreatorModule } from './rule-creator/rule-creator.module';
import { RuleCreatorComponent } from './rule-creator/rule-creator.component';
import { CardModule } from '@shared/components/card/card.module';

@NgModule({
    declarations: [TransactionDetailComponent],
    imports: [
        CommonModule,
        FormsModule,
        RuleCreatorModule,
        TransactionInfoModule,
        MatDialogModule,
        MatTooltipModule,
        CardModule
    ],
    entryComponents: [RuleCreatorComponent],
    exports: [TransactionDetailComponent]
})
export class TransactionDetailModule {}
