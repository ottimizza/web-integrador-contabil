import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule, MatButtonModule, MatProgressBarModule } from '@angular/material';

import { RuleListComponent } from './rule-list.component';
import { CardModule } from '@shared/components/card/card.module';
import { RuleCardModule } from './rule-card/rule-card.module';
import { InfoModule } from '@shared/components/info/info.module';
import { RuleEditModalModule } from './rule-edit-modal/rule-edit-modal.module';
import { RuleEditModalComponent } from './rule-edit-modal/rule-edit-modal.component';
import { ExportConfirmModalComponent } from './export-confirm-modal/export-confirm-modal.component';
import { ExportConfirmModalModule } from './export-confirm-modal/export-confirm-modal.module';
import { FilterModule } from '@modules/transacoes/transaction-list/filter/filter.module';
import { ScrollTrackerModule } from '@shared/directives/scroll-tracker.module';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { ActionButtonsModule } from '@shared/components/button/button.module';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';

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
    MatSnackBarModule,
    RuleEditModalModule,
    MatTabsModule,
    ExportConfirmModalModule,
    MatButtonModule,
    ScrollTrackerModule,
    BreadcrumbModule,
    ActionButtonsModule,
    MatProgressBarModule,
    NormalizedLayoutModule
  ],
  entryComponents: [
    RuleEditModalComponent,
    ExportConfirmModalComponent
  ]
})
export class RuleListModule { }
