import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material';

@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatAutocompleteModule
  ],
  exports: [FilterComponent]
})
export class FilterModule { }
