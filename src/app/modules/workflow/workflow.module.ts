import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowRoutingModule } from './workflow.routing';
import { WorkflowComponent } from './page/workflow.component';
import { EmptyStateModule } from '@shared/components/empty-state/empty-state.module';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { DesignSystemModule } from '@shared/components/ds.module';
import { PaginatorModule } from '@shared/components/paginator/paginator.module';
import { AsyncTableModule } from '@shared/components/async-table/async-table.module';

@NgModule({
  imports: [
    CommonModule,
    WorkflowRoutingModule,
    EmptyStateModule,
    NormalizedLayoutModule,
    MatTableModule,
    DesignSystemModule,
    PaginatorModule,
    AsyncTableModule
  ],
  declarations: [WorkflowComponent],
  exports: [],
  providers: [],
})
export class WorkflowModule { }
