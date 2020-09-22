import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowRoutingModule } from './workflow.routing';
import { WorkflowComponent } from './page/workflow.component';
import { EmptyStateModule } from '@shared/components/empty-state/empty-state.module';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { DesignSystemModule } from '@shared/components/ds.module';
import { PaginatorModule } from '@shared/components/paginator/paginator.module';
import { AsyncTableModule } from '@shared/components/async-table/async-table.module';
import { ScriptComponent } from './subpages/script/script.component';
import { CompanyCreateDialogComponent } from './dialogs/company-create-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@shared/components/file-upload/file-upload.module';
import { ChecklistComponent } from './support/checklist/checklist.component';
import { ChecklistItemComponent } from './support/checklist-item/checklist-item.component';
import { CalendarModule } from '@shared/components/calendar/calendar.module';
import { ProjectConfirmationComponent } from './support/confirmation/project-confirmation.component';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { DefaultFilterModule } from '@shared/components/default-filter/default-filter.module';
import { NgxGuidedTourModule } from '@gobsio/ngx-guided-tour';

@NgModule({
  imports: [
    CommonModule,
    WorkflowRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EmptyStateModule,
    NormalizedLayoutModule,
    MatTableModule,
    DesignSystemModule,
    PaginatorModule,
    AsyncTableModule,
    MatDialogModule,
    MatStepperModule,
    FileUploadModule,
    MatCheckboxModule,
    CalendarModule,
    BreadcrumbModule,
    DefaultFilterModule,
    MatIconModule,
    MatButtonModule,
    NgxGuidedTourModule.forRoot(),
  ],
  declarations: [
    WorkflowComponent,
    ScriptComponent,
    CompanyCreateDialogComponent,
    ChecklistComponent,
    ChecklistItemComponent,
    ProjectConfirmationComponent
  ],
  entryComponents: [
    CompanyCreateDialogComponent
  ],
  exports: [],
  providers: [],
})
export class WorkflowModule { }
