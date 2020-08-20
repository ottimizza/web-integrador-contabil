import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule, MatProgressSpinnerModule } from '@angular/material';

import { TransactionDetailComponent } from './transaction-detail.component';
import { RuleGridModule } from './rule-creator/rule-grid.module';
import { RuleGridComponent } from './rule-creator/rule-grid.component';
import { CardModule } from '@shared/components/card/card.module';
import { InfoModule } from '@shared/components/info/info.module';
import { RuleChipGroupModule } from './rule-creator/chips-group/chips-group.module';
import { ConfirmDeleteDialogComponent } from '../dialogs/confirm-delete/confirm-delete-dialog.component';
import { HistoricEditDialogModule } from '@modules/historic/dialogs/historic-edit-dialog/historic-edit-dialog.module';

@NgModule({
    declarations: [TransactionDetailComponent, ConfirmDeleteDialogComponent],
    imports: [
        CommonModule,
        FormsModule,
        RuleGridModule,
        MatDialogModule,
        MatTooltipModule,
        CardModule,
        MatProgressBarModule,
        InfoModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        RuleChipGroupModule,
        HistoricEditDialogModule
    ],
    entryComponents: [
      RuleGridComponent,
      ConfirmDeleteDialogComponent
    ],
    exports: [TransactionDetailComponent]
})
export class TransactionDetailModule { }
