import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowRoutingModule } from './workflow.routing';
import { WorkflowComponent } from './page/workflow.component';
import { EmptyStateModule } from '@shared/components/empty-state/empty-state.module';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';
import { MatTableModule, MatPaginatorModule, MatDialogModule, MatStepperModule } from '@angular/material';
import { DesignSystemModule } from '@shared/components/ds.module';
import { PaginatorModule } from '@shared/components/paginator/paginator.module';
import { AsyncTableModule } from '@shared/components/async-table/async-table.module';
import { ScriptComponent } from './subpages/script/script.component';
import { CompanyCreateDialogComponent } from './dialogs/company-create-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@shared/components/file-upload/file-upload.module';

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
    FileUploadModule
  ],
  declarations: [
    WorkflowComponent,
    ScriptComponent,
    CompanyCreateDialogComponent
  ],
  entryComponents: [
    CompanyCreateDialogComponent
  ],
  exports: [],
  providers: [],
})
export class WorkflowModule { }
