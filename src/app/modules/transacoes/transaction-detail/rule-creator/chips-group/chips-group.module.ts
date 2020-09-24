import { NgModule } from '@angular/core';
import { RuleChipGroupComponent } from './chips-group.component';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RuleChipComponent } from './rule-chip/rule-chip.component';

@NgModule({
  declarations: [RuleChipGroupComponent, RuleChipComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatChipsModule
  ],
  exports: [RuleChipGroupComponent]
})
export class RuleChipGroupModule { }
