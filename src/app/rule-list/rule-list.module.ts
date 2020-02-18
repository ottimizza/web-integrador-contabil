import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material';

import { RuleListComponent } from './rule-list.component';
import { CardModule } from '@shared/components/card/card.module';
import { RuleCardModule } from './rule-card/rule-card.module';
import { InfoModule } from '@shared/components/info/info.module';
import { FilterModule } from 'app/transacoes/transaction-list/filter/filter.module';
import { TabModule } from '@shared/components/tab/tab.module';
import { RuleEditModalModule } from './rule-edit-modal/rule-edit-modal.module';
import { RuleEditModalComponent } from './rule-edit-modal/rule-edit-modal.component';
import { RuleFilterModule } from './rule-filter/rule-filter.module';
import { ExportConfirmModalComponent } from './export-confirm-modal/export-confirm-modal.component';
import { ExportConfirmModalModule } from './export-confirm-modal/export-confirm-modal.module';

@NgModule({
  declarations: [
    RuleListComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    DragDropModule,
    MatTooltipModule,
    RuleCardModule,
    MatDialogModule,
    InfoModule,
    FilterModule,
    TabModule,
    MatSnackBarModule,
    RuleEditModalModule,
    RuleFilterModule,
    MatTabsModule,
    ExportConfirmModalModule
  ],
  entryComponents: [
    RuleEditModalComponent,
    ExportConfirmModalComponent
  ]
})
export class RuleListModule { }
