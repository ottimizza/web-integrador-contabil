import { NgModule } from '@angular/core';
import { RuleCardComponent } from './rule-card.component';
import { CommonModule } from '@angular/common';
import { RuleEditModalComponent } from '../rule-edit-modal/rule-edit-modal.component';
import { RuleEditModalModule } from '../rule-edit-modal/rule-edit-modal.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { VerticalAlignerModule } from '@shared/components/vertical-aligner/vertical-aligner.module';
import { ActionButtonsModule } from '@shared/components/action-buttons/action-buttons.module';

@NgModule({
  declarations: [RuleCardComponent],
  imports: [
    CommonModule,
    ActionButtonsModule,
    RuleEditModalModule,
    MatTooltipModule,
    DragDropModule,
    VerticalAlignerModule
  ],
  exports: [
    RuleCardComponent
  ],
  entryComponents: [
    RuleEditModalComponent
  ]
})
export class RuleCardModule { }
