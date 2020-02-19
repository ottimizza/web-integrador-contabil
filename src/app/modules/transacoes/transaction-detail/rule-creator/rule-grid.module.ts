import { NgModule } from '@angular/core';
import { RuleGridComponent } from './rule-grid.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputChipsComponent } from './input-chips/input-chips.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    RuleGridComponent,
    InputChipsComponent
  ],
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTooltipModule,
    MatButtonModule
  ],
  exports: [
    InputChipsComponent
  ]
})
export class RuleGridModule { }
