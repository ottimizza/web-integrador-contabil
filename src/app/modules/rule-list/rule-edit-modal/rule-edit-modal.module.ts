import { NgModule } from '@angular/core';
import { RuleEditModalComponent } from './rule-edit-modal.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DesignSystemModule } from '@shared/components/ds.module';

@NgModule({
  declarations: [RuleEditModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatTooltipModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,

    DesignSystemModule
  ],
  exports: [RuleEditModalComponent]
})
export class RuleEditModalModule { }
