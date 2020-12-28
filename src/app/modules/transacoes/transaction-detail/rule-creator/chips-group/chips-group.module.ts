import { NgModule } from '@angular/core';
import { RuleChipGroupComponent } from './chips-group.component';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RuleChipComponent } from './rule-chip/rule-chip.component';
import { MatMenuModule } from '@angular/material/menu';
import { OptionsMenuModule } from '@shared/components/options-menu/options-menu.module';

@NgModule({
  declarations: [RuleChipGroupComponent, RuleChipComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatChipsModule,
    OptionsMenuModule,
    MatMenuModule
  ],
  exports: [RuleChipGroupComponent]
})
export class RuleChipGroupModule { }
