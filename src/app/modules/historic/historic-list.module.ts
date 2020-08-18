import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from '@shared/components/card/card.module';
import { MatTooltipModule, MatDialogModule, MatSnackBarModule, MatTabsModule, MatButtonModule, MatProgressBarModule } from '@angular/material';
import { InfoModule } from '@shared/components/info/info.module';
import { FilterModule } from '@modules/transacoes/transaction-list/filter/filter.module';
import { RuleEditModalModule } from '@modules/rule-list/rule-edit-modal/rule-edit-modal.module';
import { ExportConfirmModalModule } from '@modules/rule-list/export-confirm-modal/export-confirm-modal.module';
import { ScrollTrackerModule } from '@shared/directives/scroll-tracker.module';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { ActionButtonsModule } from '@shared/components/button/button.module';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';
import { HistoricListRoutingModule } from './historic.routing';
import { HistoricListComponent } from './page/historic-list.component';
import { ExportConfirmModalComponent } from '@modules/rule-list/export-confirm-modal/export-confirm-modal.component';
import { HistoricCardComponent } from './support/historic-card/historic-card.component';
import { VerticalAlignerModule } from '@shared/components/vertical-aligner/vertical-aligner.module';

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
    FilterModule,
    MatSnackBarModule,
    MatTabsModule,
    ExportConfirmModalModule,
    MatButtonModule,
    ScrollTrackerModule,
    BreadcrumbModule,
    ActionButtonsModule,
    MatProgressBarModule,
    NormalizedLayoutModule,
    VerticalAlignerModule
  ],
  entryComponents: [ExportConfirmModalComponent]
})
export class HistoricListModule {}
