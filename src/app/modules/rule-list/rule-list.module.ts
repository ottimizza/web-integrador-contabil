import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';

import { RuleListComponent } from './rule-list.component';
import { CardModule } from '@shared/components/card/card.module';
import { RuleCardModule } from './rule-card/rule-card.module';
import { InfoModule } from '@shared/components/info/info.module';
import { RuleEditModalModule } from './rule-edit-modal/rule-edit-modal.module';
import { RuleEditModalComponent } from './rule-edit-modal/rule-edit-modal.component';
import { ExportConfirmModalComponent } from './export-confirm-modal/export-confirm-modal.component';
import { ExportConfirmModalModule } from './export-confirm-modal/export-confirm-modal.module';
import { ScrollTrackerModule } from '@shared/directives/scroll-tracker.module';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';
import { RuleDeleteConfirmDialogComponent } from './rule-delete-confirm-dialog/rule-delete-confirm-dialog.component';
import { ActionButtonsModule } from '@shared/components/action-buttons/action-buttons.module';
import { RuleListRoutingModule } from './rule-list.routing';
import { OptionsMenuModule } from '@shared/components/options-menu/options-menu.module';

@NgModule({
  declarations: [
    RuleListComponent,
    RuleDeleteConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RuleListRoutingModule,
    CardModule,
    DragDropModule,
    MatTooltipModule,
    RuleCardModule,
    MatDialogModule,
    InfoModule,
    MatSnackBarModule,
    RuleEditModalModule,
    MatTabsModule,
    ExportConfirmModalModule,
    MatButtonModule,
    ScrollTrackerModule,
    BreadcrumbModule,
    ActionButtonsModule,
    MatProgressBarModule,
    NormalizedLayoutModule,
    OptionsMenuModule
  ],
  entryComponents: [
    RuleEditModalComponent,
    ExportConfirmModalComponent,
    RuleDeleteConfirmDialogComponent
  ]
})
export class RuleListModule { }
