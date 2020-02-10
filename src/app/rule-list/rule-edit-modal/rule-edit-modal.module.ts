import { NgModule } from '@angular/core';
import { RuleEditModalComponent } from './rule-edit-modal.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RuleEditModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports: [RuleEditModalComponent]
})
export class RuleEditModalModule { }
