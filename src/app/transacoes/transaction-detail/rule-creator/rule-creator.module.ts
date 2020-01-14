import { NgModule } from '@angular/core';
import { RuleCreatorComponent } from './rule-creator.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputChipsComponent } from './input-chips/input-chips.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    RuleCreatorComponent,
    InputChipsComponent
  ],
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTooltipModule
  ],
  exports: [
    InputChipsComponent
  ]
})
export class RuleCreatorModule { }
