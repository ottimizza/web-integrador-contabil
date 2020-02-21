import { NgModule } from '@angular/core';
import { RuleCardComponent } from './rule-card.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@shared/components/button/button.module';
import { RuleEditModalComponent } from '../rule-edit-modal/rule-edit-modal.component';
import { RuleEditModalModule } from '../rule-edit-modal/rule-edit-modal.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [RuleCardComponent],
  imports: [
    CommonModule,
    ButtonModule,
    RuleEditModalModule,
    MatTooltipModule
  ],
  exports: [
    RuleCardComponent
  ],
  entryComponents: [
    RuleEditModalComponent
  ]
})
export class RuleCardModule { }
