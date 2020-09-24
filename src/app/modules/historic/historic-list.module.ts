import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from '@shared/components/card/card.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InfoModule } from '@shared/components/info/info.module';
import { RuleEditModalModule } from '@modules/rule-list/rule-edit-modal/rule-edit-modal.module';
import { ExportConfirmModalModule } from '@modules/rule-list/export-confirm-modal/export-confirm-modal.module';
import { ScrollTrackerModule } from '@shared/directives/scroll-tracker.module';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';
import { HistoricListRoutingModule } from './historic.routing';
import { HistoricListComponent } from './page/historic-list.component';
import { ExportConfirmModalComponent } from '@modules/rule-list/export-confirm-modal/export-confirm-modal.component';
import { HistoricCardComponent } from './support/historic-card/historic-card.component';
import { VerticalAlignerModule } from '@shared/components/vertical-aligner/vertical-aligner.module';
import { RuleDeleteConfirmDialogComponent } from '@modules/rule-list/rule-delete-confirm-dialog/rule-delete-confirm-dialog.component';
import { HistoricEditDialogModule } from './dialogs/historic-edit-dialog/historic-edit-dialog.module';
import { HistoricEditDialogComponent } from './dialogs/historic-edit-dialog/historic-edit-dialog.component';
import { LazyImgModule } from '@shared/directives/lazy-img/lazy-img.module';
import { EmptyStateModule } from '@shared/components/empty-state/empty-state.module';
import { ActionButtonsModule } from '@shared/components/action-buttons/action-buttons.module';

@NgModule({
  declarations: [
    HistoricListComponent,
    HistoricCardComponent
  ],
  imports: [
    HistoricListRoutingModule,
    CommonModule,
    CardModule,
    MatTooltipModule,
    MatDialogModule,
    InfoModule,
    MatSnackBarModule,
    MatTabsModule,
    ExportConfirmModalModule,
    MatButtonModule,
    ScrollTrackerModule,
    BreadcrumbModule,
    ActionButtonsModule,
    MatProgressBarModule,
    NormalizedLayoutModule,
    VerticalAlignerModule,
    HistoricEditDialogModule,
    EmptyStateModule,
    MatButtonModule
  ],
  entryComponents: [
    ExportConfirmModalComponent,
    RuleDeleteConfirmDialogComponent,
    HistoricEditDialogComponent
  ]
})
export class HistoricListModule {}
