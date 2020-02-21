import { NgModule } from '@angular/core';
import { RuleFilterComponent } from './rule-filter.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [RuleFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule
  ],
  exports: [RuleFilterComponent]
})
export class RuleFilterModule { }
