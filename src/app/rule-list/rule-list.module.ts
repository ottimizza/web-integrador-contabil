import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RuleListComponent } from './rule-list.component';
import { CardModule } from '@shared/components/card/card.module';
import { RuleCardModule } from './rule-card/rule-card.module';
import { RuleEditModalModule } from './rule-edit-modal/rule-edit-modal.module';
import { RuleEditModalComponent } from './rule-edit-modal/rule-edit-modal.component';

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
  ]
})
export class RuleListModule { }
