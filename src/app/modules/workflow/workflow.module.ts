import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowRoutingModule } from './workflow.routing';
import { WorkflowComponent } from './page/workflow.component';
import { EmptyStateModule } from '@shared/components/empty-state/empty-state.module';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';

@NgModule({
  imports: [
    CommonModule,
    WorkflowRoutingModule,
    EmptyStateModule,
    NormalizedLayoutModule
  ],
  declarations: [WorkflowComponent],
  exports: [],
  providers: [],
})
export class WorkflowModule { }
