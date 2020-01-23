import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TransactionDetailComponent } from './transaction-detail.component';
import { TransactionInfoModule } from './transaction-info/transaction-info.module';
import { RuleGridModule } from './rule-creator/rule-grid.module';
import { RuleGridComponent } from './rule-creator/rule-grid.component';
import { CardModule } from '@shared/components/card/card.module';
import { InfoModule } from '@shared/components/info/info.module';
import { HistoricModule } from './historic/historic.module';
import { HistoricComponent } from './historic/historic.component';
import { TabModule } from '@shared/components/tab/tab.module';

@NgModule({
    declarations: [TransactionDetailComponent],
    imports: [
        CommonModule,
        FormsModule,
        RuleGridModule,
        TransactionInfoModule,
        MatDialogModule,
        MatTooltipModule,
        CardModule,
        MatProgressBarModule,
        InfoModule,
        HistoricModule
    ],
    entryComponents: [
      RuleGridComponent,
      HistoricComponent
    ],
    exports: [TransactionDetailComponent]
})
export class TransactionDetailModule {}
